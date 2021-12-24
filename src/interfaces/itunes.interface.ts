export interface ItunesResult {
    resultCount: number;
    results:     Result[];
}

export interface iTunesSearch {

    term: string;
    entity?: entity;
    limit?: number;
    // Gracias a Wikipedia (https://es.wikipedia.org/wiki/ISO_3166-2) y a los atajos de teclado de VSCode ❤️
    country?: 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AQ' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BV' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';

}

export interface Result {

    wrapperType:        'track' | 'collection' | 'artist';
    explicitness:       'explicit' | 'cleaned' | 'notExplicit';
    kind:               'book' | 'album' | 'coached-audio' | 'feature-movie' | 'interactive-booklet' | 'music-video' | 'pdf podcast' | 'podcast-episode' | 'software-package' | 'song' | 'tv-episode' | 'artist';
    trackName:          string;
    artistName:         string;
    collectionName:     string;
    censoredName:       string;
    viewURL:            string;
    artworkUrl3000?:    string;
    artworkUrl2000?:    string;
    artworkUrl1000?:    string;
    artworkUrl500?:     string;
    artworkUrl200?:     string;
    artworkUrl100?:     string;
    artworkUrl60?:      string;
    artworkUrl30?:      string;
    
}

export interface track extends Result {
    
    kind:               'song';
    wrapperType:        'track';
    trackExplicitness:  string;
    previewURL:         string;
    trackTimeMillis:    string;
    trackViewUrl:       string;
    releaseDate:        string;
    discCount:          number;
    discNumber:         number;
    trackCount:         number;
    trackNumber:        number;
    artistId:           number;
    collectionId:       number;
    trackId:            number;
    artworkUrl3000:     string;
    artworkUrl2000:     string;
    artworkUrl1000:     string;
    artworkUrl500:      string;
    artworkUrl200:      string;
    artworkUrl100:      string;
    artworkUrl60:       string;
    artworkUrl30:       string;
    
}

export interface iTunesLookupSearch {

    /** ID del recurso */
    id:      number;
    /** Tipo de contenido a devolver. */
    entity?: entity;
    /** Límite de respuesta. */
    limit?:  number;

}

type entity = 'musicArtist' | 'musicTrack' | 'album' | 'musicVideo' | 'mix' | 'song';