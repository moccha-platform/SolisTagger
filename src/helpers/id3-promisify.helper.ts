import { read as id3read,
    update as id3update,
    create as id3create,
    write as id3write,
    removeTags as id3removeTags, Tags } from 'node-id3';

/**
 * Lee las etiquetas ID3 de un elemento de forma asíncrona.
 * @param {string} path 
 * @returns Promise<Tags>
 */
export const read = (filePath: string) => {

    return new Promise<Tags>((resolve, reject) => {

        id3read(filePath, (err: NodeJS.ErrnoException, tags: Tags) => {
            if (err) return reject(err);
            resolve(tags);
        })

    })

}

export const write = (tags: Tags, filePath: string):Promise<void> => {

    return new Promise<void>((resolve, reject) => {

        id3write(tags, filePath, (err) => {
            if (!err) return resolve();
            return reject(err);
        })

    })
    
}

export const create = (tags: Tags) => {

    return new Promise<Buffer>((resolve, reject) => {

        id3create(tags, (buffer) => { return resolve(buffer) })

    })

}

export const update = (tags: Tags, filePath: string) => {

    return new Promise<void>((resolve, reject) => {

        const result = id3update(tags, filePath);
        if (result instanceof Error) return reject(result);
        return resolve();

    })

}

export const removeTags = (filePath: string) => {

    return new Promise<void>((resolve, reject) => {

        id3removeTags(filePath, (err) => {
            if (err) return reject(err);
            return resolve();
        })

    })

}