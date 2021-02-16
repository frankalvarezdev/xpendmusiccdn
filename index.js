var releases = require('./src/functions/getReleases');
var artists = require('./src/functions/getArtists');
const fs = require('fs');

releases = releases();
artists = artists();

var a_data = JSON.stringify(artists);
var r_data = JSON.stringify(releases);

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

const generateFiles = (array, folder) => {
    if (!fs.existsSync(`dist/${folder}`)) {
        fs.mkdirSync(`dist/${folder}`);
    };
    array.forEach(data => {
        var fs = require('fs');
        var dir = `dist/${folder}/` + data.id;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFile(dir + "/index.json", JSON.stringify(data), function (err) {
            if (err) throw err;
            // console.log(dir + ' - se creo correctamente');
        });
    });
}

fs.writeFile("dist/a_data.json", a_data, function (err) {
    if (err) throw err;
    console.log('Se genero los datos generales.');
});

fs.writeFile("dist/r_data.json", r_data, function (err) {
    if (err) throw err;
    console.log('Se genero los datos generales.');
});

generateFiles(releases, "release");
generateFiles(artists, "artist");

var html = `<html><head>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<meta http-equiv="refresh" content="1; url=https://xpendmusic.com/">
</head>
<body onLoad="location.replace('https://xpendmusic.com/'+document.location.hash)"></body></html>`

fs.writeFile("dist/index.html", html, function (err) {
    if (err) throw err;
    console.log('FINALIZADO!!!');
});