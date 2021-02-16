const getDataFolder = require('./getDataFolder')
const findReleaseArtists = require('./findReleaseArtists')

module.exports = function () {
    const releases = getDataFolder('data/releases/');

    var finalReleases = [];

    releases.forEach(release => {
        release = findReleaseArtists(release);
        finalReleases.push(release);
    });
    return finalReleases;
};