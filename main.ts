/**
 * Solis Tagger 2
 * Basado en TypeScript.
 * 
 * @author Marcos Rodríguez Yélamo<marcosylrg@gmail.com>
 * @license MIT
 */

import { env } from 'process';
import { install } from 'source-map-support';
import { app } from 'electron';
import { open } from 'inspector';

import { updateAgent } from './updates/updateAgent';
import { launchRenderer } from './renderer/renderer';

install();
env.appdata = `${app.getPath('appData')}/SolisTagger`;
env.mock = '1';

(function main() {
    console.clear();
    //open(undefined, undefined, true);
    //updateAgent();
    launchRenderer();
    //updater();
    //checkVersion();
    
})();
