import { BrowserWindow, ipcMain } from 'electron';
import { Event } from './router/route.abstract.events';
import { FileEvents } from './router/file.events';
import { SettingsEvents } from './router/settings.events';
import { renderer as renderer2 } from '../renderer';
import { TaggerEvents } from './router/tagger.events';

let eventHandler: Event;

/**
 * Carga el manejador de eventos del router.
 * De esta forma se puede cargar solo los eventos que se vayan a usar.
 */
export const listenRouterEvents = (renderer: BrowserWindow) => {
    ipcMain.on('router', (_, route: string) => {

        console.log(route);

        // Si el manejador de eventos ya contiene eventos, lo desactiva.
        eventHandler ? eventHandler.unload() : null;
        
        /* Establece el tamaño de la ventana adecuado. */
        route === '/file' ? renderer2.setMiniUi() : renderer2.setWideUi()
        route === '/settings' ? renderer2.database.setAutoCompaction() :
                                renderer2.database.disableAutoCompaction()

        /* Comprueba a qué manejador pertenece la cadena del evento y
           carga el correspondiente en el eventHandler. */
        switch (route) {
            case '/file':
                eventHandler = new FileEvents()
                console.log('Cargando manejador de eventos para selector');
                break;
            case '/tagger':
                eventHandler = new TaggerEvents();
                console.log('Cargando manejador de eventos para el etiquetador...')
                break;
            case '/settings':
                eventHandler = new SettingsEvents();
                console.log('Cargando manejador de eventos para configuración...')
                break;
        }
    })
}
