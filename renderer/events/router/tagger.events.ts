// 900x560px

import { requestTag } from "../../../src/controllers/tagger.controller";
import { ipcRouterEventHandler } from "../../models/interfaces/ipcRouter.interface";
import { Event } from "./route.abstract.events";

import { shell } from 'electron';

export class TaggerEvents extends Event {

    constructor() {
        console.log('Cargando eventos del etiquetador!')
        const Events: ipcRouterEventHandler[] = [
            { event: 'requestTag', handler: requestTag },
            { event: 'openInBrowser', handler: (url:string, rr: any) => { if (url && typeof url === 'string') shell.openExternal(url); }}
        ]

        super(Events);
    }

}