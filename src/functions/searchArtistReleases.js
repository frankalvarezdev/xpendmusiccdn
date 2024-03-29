var releases = require('./getReleases');
var MarkdownIt = require('markdown-it');
releases = releases();
var md = new MarkdownIt();
var cdn = "https://cdn-v2.xpendmusic.com"

module.exports = artista => {
    
    artistReleases = [];
    artist = artista.metadata;

    releases.forEach(release => {
        var nn = 0
        release.artists.forEach(relArtist => {
            if (relArtist.id == artist.id) artistReleases.push(release);
        });
    });

    artist.biografia = md.render(artista.content);
    artist.releases = artistReleases;
    artist.image = `${cdn}/media${artist.img}`;
    artist.image_datauri = `${cdn}/media/placeholder${artist.img}`;
    artist.key = `/artistas/${artist.id}`;
    artist.url = `https://xpendmusic.com/artistas/${artist.id}`;
    delete artist.img;

    return artist;
}