/**
 * @author  Marcos Rodríguez<marcosylrg@gmail.com>
 * 
 * REFACTORIZE
 *      Separar el controlador de este modelo.
 *      Controlar métodos del modelo desde archivo externo.
 *      Implementar API de Deezer.
 */

const os = require('os');
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const { lstat, base64_encode } = require('../helpers/fs.helper');
//const { searchDeezer } = require('../helpers/deezerSearch');
const { searchItunes } = require('../helpers/itunesSearch');
const { tag } = require('../helpers/tagger');

class Renderer {

    data = {
        data: [],
        total: 0
    }
    streamEnded = false;


    constructor() {
        //console.clear();
        app.once('ready', () => {
            this.#render();
        });
        Menu.setApplicationMenu(null);
    }
    
    #render() {
        this.process = new BrowserWindow({
            minWidth: 1024,
            minHeight: 768,
            width: 1024,
            height: 768,
            center: true,
            resizable: true,
            setMenu: false,
            backgroundColor: '#000000',
            show: true,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: true,
                contextIsolation: false
            }
        });
        this.process.setMenu(null);
        this.process.setMenuBarVisibility(null);
        // Dev env.
        //this.process.loadURL('http://localhost:4200/load');
        //this.process.toggleDevTools();
        // Prod env.
        this.process.loadFile(`ui/index.html`);
        this.ipcEvents();

        app.on('window-all-closed', () => {
            if (os.platform !== 'darwin') app.quit();
        })
    }
    
    // Controlador de eventos del ipc
    ipcEvents(){
        // Controlar excepción
        ipcMain.on('elementDrop', async(event, arg) => {
            this.data = {
                data: [],
                total: 0
            }
            this.streamEnded = false;
            const data = await lstat(arg);
            if (data) {
                this.currentFile = data;
                this.send('fileStatus', data);
            } else {
                this.send('fileStatus', false);
            }
        })

        ipcMain.on('findData', () => {
            if (this.streamEnded) {
                this.send('data', this.data);
                return;
            } else {
                this.data = {
                    data: [],
                    total: 0
                }
                this.searchOnce();
                return;
            }
            // How this worked previously in old_method.js
        })
        /* 
        Refactorizado, ahora se envian datos por flujo.
        ↑ Evento findData ↑
        ipcMain.on('getData', (a) => {
            console.log("Datos solicitados!");
            this.send('data', this.data);
        }) */

        ipcMain.on('selectCover', () => {
            this.send('FindingCover');
            dialog.showOpenDialog({ properties:['openFile'], filters: [ {name: 'Imágenes', extensions: ['jpg', 'png', 'jpeg']} ]})
            .then((a) => {
                this.send('coverPath', base64_encode(a['filePaths'][0]));
            })
            .catch((err) => {
                if (err.code == "ERR_INVALID_ARG_TYPE") {
                    this.send('AbortSelectCover');
                } else {
                    console.log(err);
                }
            })
        })

        ipcMain.on('tag', (event, a) => {
            tag(a, this.currentFile.path);
        })
    }

    searchOnce() {
        searchItunes(this.currentFile, this.currentFile.name, (a) => {
            this.send('newTag', a);
            this.data.data.push(a);
        }, (/* callback de fin del flujo */) => {
            this.data.total = this.data.data.length;
            if (this.data.total == 0) {
                this.send('data', 'noMatchs');
            }
            this.streamEnded = true;
            console.log("Fin del flujo de datos");
        })
    }

    send(channel, args) {
        this.process.webContents.send(channel, args);
        return;
    }
}

module.exports = Renderer;