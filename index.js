var releases = require('./src/functions/getReleases');
var artists = require('./src/functions/getArtists');
var cloud = require('./src/functions//cloud');
const fs = require('fs');
const fse = require('fs-extra');
const createImgPlaceholder = require('./createImgPlaceholder')
const createUrl = require('./src/functions/createUrl');

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var firebase = require('firebase/app');
require('firebase/database');

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

const srcDir = `src/static`;
const destDir = `dist`;

try {
    fse.copySync(srcDir, destDir)
    console.log('- Static files were generated')
} catch (err) {
    console.error(err)
}

createImgPlaceholder();

releases = releases();
artists = artists();

var a_data = JSON.stringify(artists);

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
    console.log('- Successfully generated releases data');
});

generateFiles(artists, "artist");

var html = `<html><head>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<meta http-equiv="refresh" content="1; url=https://xpendmusic.com/">
</head>
<body onLoad="location.replace('https://xpendmusic.com/'+document.location.hash)"></body></html>`

fs.writeFile("dist/index.html", html, function (err) {
    if (err) throw err;
});

fs.writeFile("dist/404.html", html, function (err) {
    if (err) throw err;
});

// girebas.database().ref('others/r_urls').set([{ id: "xpendmusic", url: "https://xpendmusic.com" }]);

// releases = releases.slice(0, 4);
// Verificar si existe url
const __Generate = async () => {
    await firebase.database().ref('others/r_urls').once('value').then((snapshot) => {
        var urls = snapshot.val();
        var new_urls = [];
        var urls_str = JSON.stringify(urls);

        // Busqueda general - Releases
        releases.forEach(release => {
            var busqueda = null;
            // Ver si el release ya tiene una url creada
            var releaseid = release.id;
            urls.forEach(url => {
                if (releaseid == url.id) {
                    busqueda = url.url;
                    // console.log(true);
                }
            })
            // Revisar
            if (busqueda != null) {
                release.url = busqueda;
            } else {
                // console.log(false);
                // Generar url
                var url = makeid(4);
                // console.log(url);
                // Condicional == URL unica
                for (i = url; urls_str.indexOf(i) > 0; i = makeid(4)) {
                    url = i;
                }
                // Crear URL
                createUrl("https://xpendmusic.com/releases/" + release.id, url.toString());

                let n = { id: release.id, url: "http://go.xpend.co/" + url }
                new_urls.push(n);
                release.url = "http://go.xpend.co/" + url;
            }
        })

        var r_data = JSON.stringify(releases);
        fs.writeFile("dist/r_data.json", r_data, function (err) {
            if (err) throw err;
            console.log('- Successfully generated artists data');
        });

        generateFiles(releases, "release");
        var urls_data = null;

        // Ver si se crearon nuevas URLS
        if (new_urls.length != 0) {
            urls_data = [...urls, ...new_urls];
            // Enaviar datos
            firebase.database().ref('others/r_urls').set(urls_data);
        }

        // Guardar datos en firebase
        cloud(releases, artists);
    });
}

__Generate();