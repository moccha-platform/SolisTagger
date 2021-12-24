import { ipcMain } from 'electron';
import { Event } from './route.abstract.events';
import { drop } from '../../../src/controllers/selector.controller';
import { ipcRouterEventHandler } from '../../models/interfaces/ipcRouter.interface';

export class FileEvents extends Event {
    
    constructor() {

        const Events: ipcRouterEventHandler[] = [
            { event: 'drop', handler: drop },
            { event: 'tag', handler: () => {} }
        ]

        super(Events);
        
        //ipcMain.on('drop', (_, args: string[]) => { drop(args) });
        //ipcMain.removeListener('drop', drop)

    }
}