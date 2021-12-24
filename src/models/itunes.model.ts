/**
 * @author Marcos Rodríguez Yélamo<marcosylrg@gmail.com>
 * @license MIT
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import { iTunesLookupSearch, ItunesResult, iTunesSearch, Result, track } from '../interfaces/itunes.interface';

/**
 * iTunes API v2017.
 * // TODO: Preparar sobrecarga para devolución de tipos diferentes.
 */
export abstract class iTunes {

    private static _base = 'https://itunes.apple.com';

    public static search(query: iTunesSearch) {
        return new Promise((resolve, reject) => {
    
            const { term, country, entity, limit } = query;
            
            if (!term || typeof term !== 'string' || term.length <= 0) reject('Term type not allowed');
            
            let queryString = `${this._base}/search?term=${term}`;

            if (country &&  typeof country === 'string' && this.validISOCode(country)) queryString += `&country=${country}`
            else if (!country) queryString += `&country=US`;
            else reject('Invalid ISO country code')
            
            if (entity && this.validEntity(entity)) queryString += `&entity=${entity}`
            else queryString += '&entity=song';
            
            if (limit && limit > 0) queryString += `&limit=${limit}`;
            
            // TODO: Comprobar las respuestas de la API (interfaces, errores, etc).
            //       Revisar este enlace https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/UnderstandingSearchResults.html#//apple_ref/doc/uid/TP40017632-CH8-SW1

            return axios.get(encodeURI(queryString))
                .then( (a: AxiosResponse<ItunesResult>) => {
                    const { resultCount, results } = a.data;
                    console.log(this.trackArtworkSizer(results));
                    resolve({ resultCount, results: this.trackArtworkSizer(results) })
                })
                .catch( err => reject(err) );
        })

    }

    /**
     * Realiza una búsqueda por el id del recurso.
     * 
     * @param query Objeto de búsqueda por id.
     */
    public static lookupById(query: iTunesLookupSearch) {
        return new Promise((resolve, reject) => {

            const { id, entity, limit } = query;

            if (!id || typeof id !== 'number') reject('id error');

            let queryString = `${this._base}/lookup?id=${id}`;

            if (entity && this.validEntity(entity)) queryString += `&entity=${entity}`;
            
            if (limit && limit >= 0) queryString += `&limit=${limit}`;

            return axios.get(queryString)
            .then( a => resolve(a.data) )
            .catch( err => reject(err) );
        })

    }

    private static validISOCode(code:string) {
        const isocodes =
        ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF',
         'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG',
         'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC',
         'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL',
         'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN',
         'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA',
         'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN',
         'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP',
         'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO',
         'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV',
         'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG',
         'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'];

        for(let i = 0; i < 124; i++) { if (isocodes[i] === code) return true; };
        for(let i = 124; i < 249; i++) { if (isocodes[i] === code) { return true; } };

        return false;

    }

    private static validEntity(ent: string) {
        const entities = ['musicArtist', 'musicTrack', 'album', 'musicVideo', 'mix', 'song'];
        for (let entity of entities) { if (entity === ent) return true; };

        return false;
    }
    
    /**
     * iTunes dispone de carátulas mucho más grandes, pero la API no proporciona el enlace a estas.
     * Esta función formatea el nombre del archivo para añadir al resultado tamaños de hasta 3000px.
     */
    private static trackArtworkSizer(result: Result[]) {


        return result.map(track => {
            
            if (!track.artworkUrl60) return track;

            const base = track.artworkUrl60;

            track.artworkUrl200  = base.replace('source/60x60bb.', 'source/200x200bb.');
            track.artworkUrl500  = base.replace('source/60x60bb.', 'source/500x500bb.');
            track.artworkUrl1000 = base.replace('source/60x60bb.', 'source/1000x1000bb.');
            track.artworkUrl1000 = base.replace('source/60x60bb.', 'source/1000x1000bb.');
            track.artworkUrl2000 = base.replace('source/60x60bb.', 'source/2000x2000bb.');
            track.artworkUrl3000 = base.replace('source/60x60bb.', 'source/3000x3000bb.');

            return track;

        })

    }

}