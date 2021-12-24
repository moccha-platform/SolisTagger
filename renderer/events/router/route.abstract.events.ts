import { ipcMain } from 'electron';
import { ipcRouterEventHandler } from '../../models/interfaces/ipcRouter.interface';

export abstract class Event {

    private events: ipcRouterEventHandler[];

    constructor(events: ipcRouterEventHandler[]) {
        this.events = events;
        this.events.forEach(event => {
            ipcMain.on(event.event, (_, ...args) => event.handler(...args))
        })
    }

    public unload() {
        this.events.forEach(event => {
            console.log(`Removing ${event.event}`)
            //ipcMain.removeListener(event.event, (_, ...args) => event.handler(...args))
            ipcMain.removeAllListeners(event.event);
            console.warn(ipcMain.listenerCount('drop'));
        })
    }

}