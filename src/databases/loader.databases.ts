import { Settings } from './settings';
import { Cache } from './cache';

export class Databases {

    settings: Settings;
    cache: Cache;

    constructor() {
        this.settings = new Settings();
        this.cache    = new Cache();
    }

    public setAutoCompaction(interval: number = 60000) {
        this.settings.data.persistence.setAutocompactionInterval(interval);
        this.cache.data.persistence.setAutocompactionInterval(interval);
    }
    
    public disableAutoCompaction() {
        this.settings.data.persistence.stopAutocompaction();
        this.cache.data.persistence.stopAutocompaction();
    }
}