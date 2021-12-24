import { parse } from 'path';

import { renderer } from '../../renderer/renderer';
import { isDir } from '../helpers/fs.helper';
import { isTaggable } from '../helpers/MIME.helper';


/**
 * Controlador de eventos drop del renderizador.
 * Recorre todos los elementos y determina si se trata de un directorio o un archivo.
 * Si es un directorio, obtiene todos los elementos que sean archivos.
 * Posteriormente obtiene el tipo MIME y compara con una lista soportada para
 * etiquetas ID3v2.
 * @param {string[]} files
 */
export const drop = async (files: string[]) => {

    /**
     * TODO:
     * Recorrer el array y comprobar si la ruta se trata de un archivo o un directorio.
     * Después recorrer todos los archivos y comprobar el MIME para filtrarlo.
     * Devolver los elementos compatibles con el etiquetado.
     */

    try {

        const elements = await Promise.allSettled(files.map(e => isDir(e)))
        console.log(elements);

    } catch (error) {
        
    }
    if (files.length > 1) {


        Promise.allSettled(files.map(file => isDir(file)))
        .then(scanRes => {

            scanRes.forEach(e => {

                if (e.status === 'rejected') {
                    if (typeof e.reason == 'boolean') {

                    }
                }

            })

        })

    }


    Promise.allSettled(files.map(file => isTaggable(file)))
    .then(a => {
        const response = a.map(element => {
            if (element.status === 'fulfilled') {
                return {
                    valid: true,
                    path: element.value,
                    name: parse(element.value).name
                }
            } else return {
                valid: false,
                path: element.reason.path,
                name: parse(element.reason.path).name,
                MIME: element.reason.MIME
            }
        })
        console.log(a);
        console.log('Emitiendo datos');
        renderer.process.webContents.send('result', response);
    })
}