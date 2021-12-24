// TODO: Eliminar este código...


/* import axios from 'axios';

import { ItunesQuery } from '../interfaces/itunes.interface';

type country = 'US' | 'ES' | 'JP';
type entity  = 'song' | 'movie' | 'album';
const url =  process.env.mock == '0' ? 'http://itunes.apple.com/search?' : 'http://localhost:4000/itunes/';

export const searchSong = (query: string, entity: entity, country: country) => {

    return new Promise<ItunesQuery>((resolve, reject) => {

        if (!query) reject({msg: 'empty query'});
        if (!entity) entity = 'song';
        if (!country) country = 'US';

        const uri = `${url}&term=${query}&entity=${entity}&country=${country}`;

        axios.get(uri)
        .then(a => { resolve(a.data as ItunesQuery) })
        .catch( err => { reject(err)})
    })

} */