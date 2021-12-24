/**
 * @author Marcos Rodríguez Yélamo<marcosylrg@gmail.com>
 * @license MIT
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import { advancedSearchParams, Artist, DeezerQuery, TrackSearchResult } from '../interfaces/deezer.interface';

/**
 * Deezer API v2.
 */
export abstract class Deezer {
 
    private static _base:string = 'http://api.deezer.com/2.0';

    /**
     * Busca un artista por su id.
     * @see{@link https://developers.deezer.com/api/artist}
     * 
     * @param id El id del artista en la base de datos.
     */
    public static artist(id: number):Promise<Artist> {
        return new Promise((resolve, reject) => {

            if (!id || typeof id !== 'number') reject('NOT_ALLOWED_ID_TYPE');

            const url = `${this._base}/artist/${id}`;

            axios.get(url)
            .then((resp: AxiosResponse<Artist>) => {
                resolve(resp.data);
            })
            .catch(e => { console.error(e) })

        })
    }

    /**
     * Consulta de búsqueda avanzada.
     * @see {@link https://developers.deezer.com/api/search}
     */
    public static advancedSearch(params: advancedSearchParams):Promise<TrackSearchResult> {
        return new Promise((resolve, reject) => {

            let queryString = `${this._base}/search?q=`;
            const { artist, album, track, label, dur_min, dur_max, bpm_min, bpm_max } = params;
            
            if (!track &&
                !album &&
                !artist &&
                !label &&
                !dur_min &&
                !dur_max &&
                !bpm_min &&
                !bpm_max) return reject('EMPTY_QUERY');
                
            if (track)   queryString += `track:"${track}"`;
            if (album)   queryString += `album:"${album}"`;
            if (artist)  queryString += `artist:"${artist}"`;
            if (label)   queryString += `label:"${label}"`;
            if (dur_min) queryString += `dur_min:"${dur_min}"`;
            if (dur_max) queryString += `dur_max:"${dur_max}"`;
            if (bpm_min) queryString += `bpm_min:"${bpm_min}"`;
            if (bpm_max) queryString += `bpm_max:"${bpm_max}"`;
            
            queryString = this.addGlobalParams(params, queryString);

            //queryString = 'https://httpstat.us/300';

            axios.get(queryString)
            .then((resp: AxiosResponse<TrackSearchResult>) => {
                return resolve(resp.data);
            })
            // TODO: Preparar una respuesta.
            .catch((e:AxiosError) => {
                const { code } = e;
            })

        }) 
    }

    /**
     * Busca los parámetros globales para añadirlos a la cadena de consultas y devuelve una url lista.
     * @see {@link https://developers.deezer.com/api/parameters}
     * 
     * @param query Parámetros globales (limit e index).
     * @param url Cadena de consulta a la API.
     */
    private static addGlobalParams(query: DeezerQuery, url: string) {

        const { limit, index } = query;

        if (limit && typeof limit === 'number' && limit > 0 ) url += `&limit=${limit}`;
        if (index && typeof index === 'number') url += `$index=${index}`;

        return url;

    }
}