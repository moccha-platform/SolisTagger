interface storage {
    artists: artist[];
    albums: album[];
}

interface artist {

    id:             number
    name:           string
    link:           string
    picture:        string
    picture_small:  string
    picture_medium: string
    picture_big:    string
    picture_xl:     string
    tracklist:      string
    type:           string

}

interface album {

    id:           number
    title:        string
    cover:        string
    cover_small:  string
    cover_medium: string
    cover_big:    string
    cover_xl:     string
    md5_image:    string
    tracklist:    string
    type:         string
    
}