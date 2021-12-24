import { EventEmitter } from 'events';
import { read, create, write, update, removeTags, Tags } from 'node-id3';

export class Id3 {

    public tags: Tags;
    public count: number;
    public path: string;
    public emisor = new EventEmitter()

    constructor(path: string) {
        try {
            read(path, (err: NodeJS.ErrnoException, tags: Tags) => {
                if (err) this.emisor.emit('error', err)
                else this.emisor.emit('tags', tags);
            })
            this.tags = read(path);
            this.count = Object.entries(this.tags).length;
        } catch (error) {
            console.log('error');
        }
    }

    deleteTag(tag: string | string[]) {
        if (typeof tag === 'string') {
            const tags = this.tags as any;
            delete tags[tag];
            this.tags = tags as Tags;
        } else if (typeof tag === 'object') {
            tag.forEach(tag => {
                this.deleteTag(tag);
            })
        } else return new Error('Type not allowed');
    }

    update() {
        update(this.tags, this.path);
    }
    
    removeAllTags() {
        return new Promise<void>((resolve, reject) => {
            const action = removeTags(this.path)
            if (action instanceof Error) reject(action);
            else resolve();
        })
    }
}

const readTags = (path: string) => {

    read(path, (err: NodeJS.ErrnoException, tags: Tags) => {
        if (err) {}
    })

}