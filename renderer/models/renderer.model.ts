import { app, BrowserWindow, ipcMain } from 'electron';
import { listenRouterEvents } from '../events/router.events';
import { Databases } from '../../src/databases/loader.databases';
import { sendSettings } from '../../src/controllers/settings.controller';

export class Renderer {

    process: BrowserWindow
    database: Databases

    constructor() {
        this.database = new Databases();
        app.on('ready', () => this.init())
    }
    
    private init() {

        this.process = new BrowserWindow({
            /* minWidth: 350,
            minHeight: 450, */
            minWidth: 840,
            minHeight: 560,
            width: 350,
            height: 450,
            backgroundColor: '#0A0E18',
            titleBarStyle: 'customButtonsOnHover',
            webPreferences: {
                nodeIntegration: true,
                webSecurity: true,
                contextIsolation: false
            }
        })
        listenRouterEvents(this.process);
        ipcMain.on('getSettings', () => {sendSettings()})
        this.process.loadURL('http://localhost:5000')
        .then(() => {
            console.log('Dirección de desarrollo cargada...');
        }).catch(() => {
            console.error('Error al cargar dirección de desarrollo.')
        })
        //this.process.loadFile(`renderer/ui/index.html`)

    }

    public setWideUi() {
        this.process.setMinimumSize(900, 600);
        this.process.setContentSize(900, 600, true);
    }
    
    public setMiniUi() {
        this.process.setMinimumSize(350, 450);
        this.process.setContentSize(350, 450, true)
    }

}