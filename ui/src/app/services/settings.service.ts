import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { appVersions, updateInfo } from '../interfaces/appUpdate.interface';
import { settingsParams } from '../interfaces/settingsParams.interface';
import { IpcService } from './ipc.service';
import { TranslateService } from './translate.service';



@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	public params: settingsParams = {
		search: {
			filter: 6,
			reduceFilter: true
		},
		tagger: {
			renameFile: true,
			buildLibrary: false,
			excludeMeta: []
		},
		language: {
			selected: 'en',
			auto: true
		},
		cache: {
			enabled: true
		}, 
		appearance: {
			mode: "dark",
			auto: true,
			primary: "#0080FF"
		},
		updates: {
			autoUpdate: true
		}
	}

	private updateChecker: NodeJS.Timer

	public updateInfo: updateInfo;
	public systemInfo: appVersions

  	constructor(@Inject(DOCUMENT)
	  			private document: Document,
				private translate: TranslateService,
				private ipc: IpcService,
				private zone: NgZone ) {
					
		this.loadTheme(this.params.appearance.mode);
		this.ipc.once('updateChecks', (_, a: updateInfo) => {
			this.zone.run(() => { this.updateInfo = a; })
		})
		//this.ipc.send('updateCheck');
	}

  	public save(){ console.log(`Saving theme ${this.params.appearance.mode} mode`) }

	public searchFilterTester(val1: string, val2: string): boolean  {
		if (val1 === val2) return true
		return false
	}

	set theme(mode : settingsParams['appearance']['mode']) {
		this.loadTheme(mode);
		this.params.appearance.mode = mode;
	}
	

	set primary(color: string) {
		this.params.appearance.primary = color;
		this.loadPrimaryColor(color);
	}

	set settings(a: settingsParams) {
		this.params = a;
		this.theme = this.params.appearance.mode;
		this.primary = this.params.appearance.primary
	}

	toggleAuto() {
		this.theme = this.params.appearance.mode;
	}

	private loadTheme(theme: settingsParams['appearance']['mode']) {
		
		const { auto } = this.params.appearance;
		const themeStylesheet = <HTMLLinkElement>this.document.getElementById('theme');
		
		const head = this.document.getElementsByTagName('head');
		const link: HTMLLinkElement = this.document.createElement('link');
		link.rel = 'stylesheet';
		link.id = 'theme';
		
		/* Carga las hojas de estilo de modo automático (definido por el sistema) */
		if (auto) {
			if (theme === 'dark') link.href = './auto_dark.css';
			else if (theme === 'deep-dark') link.href = './auto_deepdark.css';
			else if (theme === 'light')link.href = './auto_dark.css';
			
			/* Carga una hoja de estilo concreta. */
		} else {
			if (theme === 'dark') link.href = './dark.css';
			else if (theme === 'deep-dark') link.href = './deep-dark.css';
			else if (theme === 'light') link.href = './light.css';
		}
		
		themeStylesheet.remove();
		head[0].appendChild(link);

	}

	private loadPrimaryColor(color: string) {
		this.document.body.style.setProperty('--accent', color);
		const a = color.replace('#', '');
		const rgb = [
			parseInt(a.slice(0,2).toString(), 16),
			parseInt(a.slice(2,4).toString(), 16),
			parseInt(a.slice(4,6).toString(), 16)
		];
		this.document.body.style.setProperty('--accentRGB', `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`);
		this.updateSettings();
	}

	public updateSettings() {
		const { cache, ...r } = this.params;
		const { content, ...params } = cache;
		r['cache'] = { ...params };
		this.ipc.send('update', r);
	}

	public loadSettings(settings: settingsParams) {
		console.log('Cargando')
		console.log(settings)
		this.params = settings;
		const { appearance } = settings
		this.loadTheme(appearance.mode);
		this.loadPrimaryColor(appearance.primary);
		if (settings.language.auto) this.translate.autoLang();
		else this.translate.setLanguage(settings.language.selected).subscribe(
			a => {},
			err => { this.translate.setLanguage('en')}
		)
		if (settings.updates.autoUpdate) {
			this.updateChecker = setInterval(this.checkUpdates, 1200000)
		}
	}

	private checkUpdates() {
		this.ipc.once('updateChecks', (_, stats: updateInfo) => {
			if (stats.error) return;
			if (stats.pending) this.updateInfo = stats;

		});
		this.ipc.send('updateChecks');
	
		// TODO: Revisar el servidor de actualizaciones.
		/* setTimeout(() => {
			// IPC Timeout.
			this.ipc.removeAllListeners('updateChecks')
		}, 60000); */

	}
  
}
