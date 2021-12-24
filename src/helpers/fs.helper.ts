import { stat, fstat, open } from 'fs';
import { isDirInterface } from '../interfaces/fs.interface';

export const isDir = (path: string) => {
    return new Promise<isDirInterface>((resolve, reject) => {
        stat(path, (err, stats) => {
            if (err) reject(err);
            
            if (stats.isDirectory()) {
                resolve({ sym: false, path })

            } else if (stats.isSymbolicLink()) {
                open(path, 'r', (err, fd) => {
                    if (err) reject(err);
                    fstat(fd, (err, stats) => {
                        if (err) reject(err);
                        if (stats.isDirectory()) resolve({ sym: true, path })
                    })
                })
            } else {
                reject(false);
            }
        })
    })
}

export const elementType = (path: string) => {

    stat(path, (err, stats) => {
        if (err){}
    })

}