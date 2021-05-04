
const { writeFileSync } = require('fs');
const fetch = require('node-fetch');
const NodeID3 = require('node-id3').Promise;
const { buffer:makeBuffer } = require('./fs.helper');
const { isURL } = require('./checkers');

const tag = async(data = test, path) => {

    // Declara todo lo necesario.
    const { genre, number:trackNumber, bpm, title } = data;
    const { title:album, cover_xl, cover_base64, track_count:aTrackNumber, date } = data.album;
    const { name:artist } = data.artist;

    // Declara la carátula.
    let APIC;

    // Comprueba que la imagen en base64 está definida y crea un buffer a partir de ella.
    if (cover_base64) {
        APIC = Buffer.from(cover_base64, 'base64');
        console.log(APIC);
    // Comprueba que el enlace a la imagen XL exista, entonces la descarga y crea un buffer a partir de ella.
    } else if (isURL(cover_xl)) {
        const buffer = await fetch(cover_xl)
        APIC = await buffer.buffer();
        console.log(APIC);
    }
    
    // Declara la etiqueta de base.
    const tags = {
        title,
        artist,
        album
    }

    // Comprueba y añade propiedades.
    if (APIC) {
        tags.image = APIC;
    }
    if (trackNumber) {
        tags.trackNumber = trackNumber;
    }
    if (aTrackNumber) {
        tags.partOfSet = aTrackNumber;
    }
    if (bpm && bpm > 0) {
        tags.bpm = bpm;
    }
    if (genre) {
        tags.genre = genre;
    }
    if (date) {
        tags.year = date;
    }

    // Comprueba el archivo y crea un buffer a partir de él.
    makeBuffer(path)
    ///Proceso 1
    .then((buffer) => {
        // Buffer creado, escribiendo etiqueta en él.
        NodeID3.write(tags, path)
        .then((a) => {
            NodeID3.read(path)
            .then((a) => {
                console.log(a);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = {
    tag
}

//tag(test, "/Users/marcos/Desktop/Ozuna - Baila Baila Baila (Remix) Feat. Daddy Yankee, J Balvin, Farruko, Anuel AA (Audio Oficial.mp3");

/* const song = buffer('/Users/marcos/Music/The Midnight/The Midnight - Gloria.mp3')
const tag = NodeID3.read(song);
writeFileSync(__dirname+'/NodeID3output.json', JSON.stringify(tag)); */
