import { Magic, MAGIC_MIME_TYPE } from 'mmmagic';

/**
 * Compueba el MIME y lo devuelve en una promesa.
 */
export const checkMIME = (path: string) => {
    return new Promise<string>((resolve, reject) => {
        new Magic(MAGIC_MIME_TYPE)
        .detectFile(path, (err, mime) => {
            if (err) reject({ path, err });

            if (typeof mime == 'object') {
                resolve(mime[0])
            } else {
                resolve(mime);
            }
        })
    })
}

export const isTaggable = (path: string) => {
    return new Promise<string>((resolve, reject) => {
        checkMIME(path)
        .then(MIME => {
            console.log(validMIME(MIME));
            
            if (validMIME(MIME)) resolve(path);
            else reject({path, MIME});
        })
        .catch(err => {
            console.log(err);
            reject({path, err});
        })
    })
}

export const validMIME = (MIME: string) => {

    return  MIME == 'audio/mpeg'  || MIME == 'audio/wav'  ||
            MIME == 'audio/x-wav' || MIME == 'audio/aiff' ||
            MIME == 'audio/mp4'   || MIME == 'video/mp4'

}