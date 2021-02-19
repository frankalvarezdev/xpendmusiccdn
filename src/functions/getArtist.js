const metadataParser = require('markdown-yaml-metadata-parser');
const fs = require('fs');
const searchArtistReleases = require('./searchArtistReleases');
const idFile = require('./idFile');

module.exports = id_data => {
    var id = idFile(id_data, "./data/artists/");

    if (id == id_data) {
        return "error"
    }

    let artista = fs.readFileSync('./data/artists/' + id, 'utf-8');
    artista = metadataParser(artista);

    let date = id.split("-");
    date = { date: date[0] + "-" + date[1] + "-" + date[2] };
    artista.metadata = { ...{ id: id_data }, ...artista.metadata, ...date }

    artista = searchArtistReleases(artista);

    return artista;
}