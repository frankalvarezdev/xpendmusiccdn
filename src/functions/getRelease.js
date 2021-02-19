const metadataParser = require('markdown-yaml-metadata-parser');
const fs = require('fs');
const findReleaseArtists = require('./findReleaseArtists');
const idFile = require('./idFile');

module.exports = id_data => {
    var id = idFile(id_data, "./data/releases/");

    if (id == id_data) {
        return "error"
    }
    
    let release = fs.readFileSync('./data/releases/' + id, 'utf-8');
    release = metadataParser(release);

    let date = id.split("-");
    date = { date: date[0] + "-" + date[1] + "-" + date[2] };
    release.metadata = { ...{ id: id_data }, ...release.metadata, ...date }

    release = findReleaseArtists(release.metadata);

    return release;
}