export interface TrackSearchResult {
    data:  Track[];
    total: number;
}

export interface Track {
    id:                      number;
    readable:                boolean;
    title:                   string;
    title_short:             string;
    title_version:           string;
    link:                    string;
    duration:                number;
    rank:                    number;
    explicit_lyrics:         boolean;
    explicit_content_lyrics: number;
    explicit_content_cover:  number;
    preview:                 string;
    md5_image:               string;
    artist:                  Artist;
    album:                   Album;
    type:                    string;
}

export interface Album {
    id:           number;
    title:        string;
    cover:        string;
    cover_small:  string;
    cover_medium: string;
    cover_big:    string;
    cover_xl:     string;
    md5_image:    string;
    tracklist:    string;
    type:         string;
}

export interface Artist {
    /** The artist's Deezer id */
    id:             number;
    /** The artist's name */
    name:           string;
    /** The url of the artist on Deezer */
    link:           string;
    /** The share link of the artist on Deezer */
    share:          string;
    /** The url of the artist picture. Add 'size' parameter to the url to change size. Can be 'small', 'medium', 'big', 'xl' */
    picture:        string;
    /** The url of the artist picture in size small. */
    picture_small:  string;
    /** The url of the artist picture in size medium. */
    picture_medium: string;
    /** The url of the artist picture in size big. */
    picture_big:    string;
    /** The url of the artist picture in size big. */
    picture_xl:     string;
    /** The number of artist's albums. */
    nb_album:       number;
    /** The number of artist's albums. */
    nb_fan:         number;
    /** true if the artist has a smartradio. */
    radio:          boolean;
    /** API Link to the top of this artist. */
    tracklist:      string;
}

export interface DeezerQuery {

    limit?:     number;
    index?:     number;

}

/**
 * Interface for advanced search params
 */
export interface advancedSearchParams
       extends DeezerQuery {

    artist?:    string;
    album?:     string;
    track?:     string;
    label?:     string;
    dur_min?:   number;
    dur_max?:   number;
    bpm_min?:   number;
    bpm_max?:   number;

}