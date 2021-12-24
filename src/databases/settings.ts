import { env } from 'process';
import Datastore from 'nedb-promises';
import { settingsUpdate } from '../interfaces/settings.interface';
import { params, renderer } from './settings.placeholder.json';

export class Settings {
    
    data: Datastore;
    private _id: string;
    
    constructor() {
        this.data = Datastore.create(`${env.appdata}/settings.db`);
        this.data.findOne({'params': { $exists: true}})
        .then(a => {
            if (!a) this.initDB();
            else this._id = a._id;
        })
        .finally(() => {
            this.data.findOne({'params': { $exists: true}})
            .then(a => console.log(a))
        })
    }

    public updateSettings(a: settingsUpdate) {
        console.log(`${env.appdata}/settings.db`);
        //return this.data.update({ 'params': { $exists: true }}, { 'search': a });
        return this.data.update({ 'params': { $exists: true }}, { $set: {'params': a} })
        .then((a) => {
            this.data.persistence.compactDatafile();
            return a;
        });
    }

    public get params() {
        return this.data.findOne({ 'params': { $exists: true }})
    }

    private initDB() {
        console.warn('Inicializando la base de datos de configuraciones...')
        this.data.insert({params: params})
        this.data.insert({renderer: renderer})
        .then(a => {
            this._id = a._id;
            console.log(a._id)
        })
        this.data.persistence.compactDatafile();
    }
    
}