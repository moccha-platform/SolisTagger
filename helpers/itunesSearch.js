const itunes = require('searchitunes');
const { findArtist } = require('./deezerSearch');
const { compareTwoStrings } = require('string-similarity')
const colors = require('colors');

// Almacenamiento de artistas (para no saturar a llamadas la API de Deezer)
const store = []

const searchItunes = async(a, name, callback, endStream) => {
    console.log(name);
    itunes({
        entity: 'song',
        country: 'ES',
        term: a.name,
        limit: 0
    })
    .then(async(a) => {
        for await (const i of a.results) {
            const track = `${i.artistName} - ${i.trackName}`
            const comparison = compareTwoStrings(name, track);
            if (comparison < 0.6) {
                console.log(`Omitiendo coincidencia - coeficiente Dice: ${comparison}`);
                continue;
            }
            const artist = await parse(i);
            if (!artist) {
            }
            const format = await formatting(i, artist);
            callback(format);
        }
        endStream();
    })
    .catch((err) => {
        if (err = "Error: no results") {
            endStream();
        }
    })
}

const parse = async(a) => {
    // Procesando datos de un track.
    const { artistName } = a;
    let artist = await storeSearch(artistName);
    // Si no hay un artista, lo buscamos.
    if (!artist) {
        return await findArtist(artistName)
        .then(async(a) => {
            if (a.total == 0) {
                artist = {
                    name: artistName,
                    picture: "",
                    picture_small: "",
                    picture_medium: "",
                    picture_big: "",
                    picture_xl: ""
                };
                addStore(artist);
                return artist;
            } else {
                const artist = await a.data.find(b => b.name == artistName);
                if (artist) {
                    addStore(artist);
                    return artist;
                }
            }
            
            /* for (i of a.data) {
                if (i.name == artistName) {
                    // Artista encontrado, añadiendo a la store
                    //console.log(`${i.name} encontrado`.bgBlue);
                    addStore(i);
                    return i;
                } else if (i.name == undefined) {
                    console.log("Error undefined!!");
                    return
                }
            } */
            // Artista no encontrado en ninguna iteración, añadiendo simulación
            artist = {
                name: artistName,
                picture: "",
                picture_small: "",
                picture_medium: "",
                picture_big: "",
                picture_xl: ""
            };
            addStore(artist);
            return artist;
        })
        .catch((err) => {
            // Si no se encuentra el artista, se crea uno vacío.
            artist = {
                name: artistName,
                picture: "",
                picture_small: "",
                picture_medium: "",
                picture_big: "",
                picture_xl: ""
            };
            addStore(artist);
            return artist;
        });
    }
}

const formatting = async(track, artist) => {
    const { artistName, collectionName, trackName, trackCount, trackNumber, artworkUrl100, primaryGenreName, releaseDate } = track;
    let placeholder;
    if (!artist) {
        placeholder = {
            name: artistName,
            picture: "",
            picture_small: "",
            picture_medium: "",
            picture_big: "",
            picture_xl: ""
        };
    } else {
        const { picture, picture_small, picture_medium, picture_big, picture_xl } = artist;
        placeholder = { picture, picture_small, picture_medium, picture_big, picture_xl };
    }

    const pattern = "100x100bb.jpg";
    const cover_small = artworkUrl100.replace(pattern, "56x56bb.jpg");
    const cover_medium = artworkUrl100.replace(pattern, "250x250bb.jpg");
    const cover_big = artworkUrl100.replace(pattern, "500x500bb.jpg");
    const cover_xl = artworkUrl100.replace(pattern, "1000x1000bb.jpg");
    const date = new Date(releaseDate).getFullYear();
    return {
        "album": {
            title: collectionName,
            cover_small: cover_small,
            cover_medium: cover_medium,
            cover_big: cover_big,
            cover_xl: cover_xl,
            cover_base64: "",
            track_count: trackCount,
            date: date 
        },
        "artist": {
            name: artistName,
            picture: placeholder.picture,
            picture_small: placeholder.picture_small,
            picture_medium: placeholder.picture_medium,
            picture_big: placeholder.picture_big,
            picture_xl: placeholder.picture_xl
        },
        title: trackName,
        genre: primaryGenreName,
        bpm: 0,
        number: trackNumber,
        customTag: false
    }
}


const storeSearch = async(a) => {
    const artist = await store.find(b => b.name == a);
    if (artist) {
        //console.log("Artista",artist.name,"encontrado");
        return artist;
    } else {
        return false;
    }
}

const addStore = (a) => {
    //console.log(`Añadiendo ${a.name} a la store`.bgYellow);
    //console.log("Añadiendo",a.name,"a la store");
    store.push(a);
}






const assign = (store, data) => {

    const { trackName,
    artistName,
    collectionName,
    artworkUrl100,
    releaseDate,
    trackNumber,
    primaryGenreName } = data;


    const coverRes = "100x100bb.jpg";

    const cover_small = artworkUrl100.replace(coverRes, "56x56bb.jpg");
    const cover_medium = artworkUrl100.replace(coverRes, "250x250bb.jpg");
    const cover_big = artworkUrl100.replace(coverRes, "500x500bb.jpg");
    const cover_xl = artworkUrl100.replace(coverRes, "1000x1000bb.jpg");
    
    try {
        const artist = store.find(a => a.name == artistName);
        const {
            picture,
            picture_small,
            picture_medium,
            picture_big,
            picture_xl
        } = artist;
        
        const item = {
            title: trackName,
            artist: {
                name: artistName,
                picture,
                picture_small,
                picture_medium,
                picture_big,
                picture_xl
            },
            album: {
                title: collectionName,
                cover_small,
                cover_medium,
                cover_big,
                cover_xl
            },
        };
        return item;
    } catch (error) {
        console.log("error");
        console.log(error);
    }
}











const format = (a) => {
    return new Promise(async(resolve, reject) => {
        let store = [];
        const data = [];
    
        l1:
        for (let i = 0; i < a.results.length; i++) {
            const { trackName,
                artistName,
                collectionName,
                artworkUrl100,
                releaseDate,
                trackNumber,
                primaryGenreName,
                 } = a.results[i];

            if (!store.find(artist => artist.name === artistName)) {
                let artist;

                await findArtist(encodeURI(artistName))
                .then((a) => {
                    artist = a;
                })
                .catch((err) => {
                    console.log(err);
                })

                for (let i = 0; i < artist.data.length; i++) {
                    if (artist.data[i].name === artistName) {
                        store.push({
                            name,
                            picture,
                            picture_small,
                            picture_medium,
                            picture_big,
                            picture_xl
                        } = artist.data[i]);
                        //data.push(assign(store, { trackName, artistName, collectionName, artworkUrl100, releaseDate, trackNumber, primaryGenreName }));
                        //return(assign(store, { trackName, artistName, collectionName, artworkUrl100, releaseDate, trackNumber, primaryGenreName }));
                        resolve(assign(store, { trackName, artistName, collectionName, artworkUrl100, releaseDate, trackNumber, primaryGenreName }));
                        break l1;
                    } else {
                        //console.log(a.data[i].name,"no es igual que",artistName);
                        continue;
                    }
                }
                
            } else {
                //data.push(assign(store, { trackName, artistName, collectionName, artworkUrl100, releaseDate, trackNumber, primaryGenreName }));
                //return(assign(store, { trackName, artistName, collectionName, artworkUrl100, releaseDate, trackNumber, primaryGenreName }));
                resolve(assign(store, { trackName, artistName, collectionName, artworkUrl100, releaseDate, trackNumber, primaryGenreName }));
            }   
        }
        
        /* resolve({
            data: data,
            total: data.length
        }); */
        
    })

}


module.exports = {
    searchItunes,
    format
}