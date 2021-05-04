const deezerPublicApi = require('deezer-public-api');
const deezer = new deezerPublicApi;

const searchDeezer = (a) => {
    return deezer.search(encodeURI(a.name));
}

const findArtist = (a) => {
    return deezer.search.artist(encodeURI(a))
}

module.exports = {
    searchDeezer,
    findArtist,
}