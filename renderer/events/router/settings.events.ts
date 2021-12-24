import { Event } from './route.abstract.events';
import { ipcRouterEventHandler } from '../../models/interfaces/ipcRouter.interface';
import { appInfo, checkUpdates, comparer, update } from '../../../src/controllers/settings.controller';

export class SettingsEvents extends Event {

    constructor() {

        const Events: ipcRouterEventHandler[] = [
            { event: 'update', handler: update },
            { event: 'stringChecker', handler: comparer },
            { event: 'appInfo', handler: appInfo },
            { event: 'updateChecks', handler: checkUpdates }
        ]

        super(Events);

    }

}