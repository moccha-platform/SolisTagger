import { readFile } from 'fs/promises'
import { execFile } from 'child_process'

export const execBypass = () => {

    console.log('Buscando bypass');
    
    readFile(`${process.env.appdata}/update/bypassEntry.ts`, { encoding: 'utf8' })
    .then(a => {
        console.log('Cargando bypass');
        execFile(`${process.env.appdata}/update/bypassEntry.ts`);
    })
    .catch(err => {
        console.error(err);
    })

}