const getDataFolder = require('./getDataFolder');
var fs = require('fs');

module.exports = release => {

    const artists = getDataFolder('./data/artists/', true);
    const cdn = "https://cdn-v2.xpendmusic.com"

    var a = release.artists;
    release.artists = [];

    a.forEach(artista => {
        var theArtist = null;
        var a = artista.id;

        artists.forEach(artist => {
            if (a == artist.metadata.id) {
                artist = artist.metadata;
                var relArtist = {
                    id: artist.id,
                    name: artist.name,
                    url: `https://xpendmusic.com/artistas/${artist.id}/`,
                    key: `/artistas/${artist.id}`
                };
                theArtist = relArtist;
            }
        });

        release.artists.push(theArtist);
    });

    release.image = `${cdn}/media${release.img}`;
    release.image_datauri = `${cdn}/media/placeholder${release.img}`;

    return release;
}