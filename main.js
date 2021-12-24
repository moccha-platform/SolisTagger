"use strict";
/**
 * Solis Tagger 2
 * Basado en TypeScript.
 *
 * @author Marcos Rodríguez Yélamo<marcosylrg@gmail.com>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const source_map_support_1 = require("source-map-support");
const electron_1 = require("electron");
const renderer_1 = require("./renderer/renderer");
source_map_support_1.install();
process_1.env.appdata = `${electron_1.app.getPath('appData')}/SolisTagger`;
process_1.env.mock = '1';
(function main() {
    console.clear();
    //open(undefined, undefined, true);
    //updateAgent();
    renderer_1.launchRenderer();
    //updater();
    //checkVersion();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQ0FBOEI7QUFDOUIsMkRBQTZDO0FBQzdDLHVDQUErQjtBQUkvQixrREFBcUQ7QUFFckQsNEJBQU8sRUFBRSxDQUFDO0FBQ1YsYUFBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLGNBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztBQUN0RCxhQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUVmLENBQUMsU0FBUyxJQUFJO0lBQ1YsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hCLG1DQUFtQztJQUNuQyxnQkFBZ0I7SUFDaEIseUJBQWMsRUFBRSxDQUFDO0lBQ2pCLFlBQVk7SUFDWixpQkFBaUI7QUFFckIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9