import { spawn } from 'child_process';
import { app } from 'electron'

/**
 * Agente de actualización del etiquetador.
 * ## NO USAR, SE TRATA DE UN EXPERIMENTO.
 */
export const updateAgent = () => {

    console.log('Iniciando el agente de actualización...')

    const updateAgent = spawn("/Users/marcos/Desktop/stdio/stdin");

    updateAgent.stdout.on('data', (chunk: Buffer | string) => {

        chunk = chunk.toString('utf-8');

        if (chunk === 'ready') {
            updateAgent.stdin.write(app.getPath('exe'));
            updateAgent.stdin.write(__dirname);
            updateAgent.stdin.end();
        } else if (chunk === 'donePath') {
            app.exit();
            process.exit();
        }
    })

}