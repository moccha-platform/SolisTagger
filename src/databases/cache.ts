import { env } from 'process';
import Datastore from 'nedb-promises';

type collectionType = 'artist' | 'song' | 'album';

export class Cache {
    
    public data: Datastore;
    
    /** Controlador de la base de datos de la caché. */
    constructor() {
        this.data = Datastore.create(`${env.appdata}/cache.db`);
    }

    /** Añade un elemento */
    public add(type: collectionType, query: string ) {
        return this.data.update({ store: type }, { $push: query} )
            .then(() => this.compact());
    }

    /** Busca elementos que coincidan con la consulta. */
    public find(type: collectionType, query: string) {
        return this.data.find({ store: type, name: { $regex: `.*${query}.*` } });
    }
    
    /** Busca un elemento y devuelve el primero que coincida. */
    public findOne(type: collectionType, query: string) {
        return this.data.findOne({ store: type, name: query });
    }

    /** Busca un elemento por su id. */
    public findById(type: collectionType, id: number) {
        return this.data.findOne({ store: type, _id: id});
    }
    
    /** Elimina un elemento por su id. */
    public delete(type: collectionType, id: number) {
        return this.data.remove({ store: type, _id: id }, { multi: true } )
            .then(() => this.compact());
    }

    /** Compacta la base de datos. */
    private compact() {
        this.data.persistence.compactDatafile();
    }
}