const metadataParser = require('markdown-yaml-metadata-parser');
const fs = require('fs');
const findReleaseArtists = require('./findReleaseArtists');
const idFile = require('./idFile');

module.exports = id_data => {
    var id = idFile(id_data, "data/releases/");

    let release = fs.readFileSync('data/releases/' + id, 'utf-8');
    release = metadataParser(release);

    let date = id.split("-");
    date = { date: date[2] + "-" + date[1] + "-" + date[0] };
    release.metadata = { ...{ id: id_data }, ...release.metadata, ...date }

    release = findReleaseArtists(release.metadata);

    return release;
}