const getDataFolder = require('./getDataFolder');
const searchArtistReleases = require('./searchArtistReleases')

module.exports = function () {
    const artists = getDataFolder('./data/artists/', true);
    var finalArtists = [];

    artists.forEach(artista => {
        var artist = searchArtistReleases(artista);
        finalArtists.push(artist);
    });
    
    return finalArtists.reverse();
};