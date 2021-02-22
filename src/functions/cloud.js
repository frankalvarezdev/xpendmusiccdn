require('dotenv').config();
var firebase = require('firebase/app');
require('firebase/database');

var app = firebase.initializeApp({
    apiKey: process.env.FBKY,
    authDomain: "xpend-music-data.firebaseapp.com",
    databaseURL: "https://xpend-music-data-default-rtdb.firebaseio.com",
    projectId: "xpend-music-data",
    storageBucket: "xpend-music-data.appspot.com",
    messagingSenderId: "1080830841175",
    appId: "1:1080830841175:web:9ad0785e66004441802e12",
    measurementId: "G-BM89G596VH"
});

module.exports = (releases, artists) => {
    const database = async (path, data, nb = false) => {
        await firebase.database().ref(path).set(data);
        if (nb) {
            n++;
            if (n == ln) {
                console.log('THE PROCESS WAS SUCCESSFULLY COMPLETED :D!');
                setTimeout(function () {
                    process.exit();
                }, 1200);
            }
        }
    }

    database('artists', {});
    database('releases', {});

    var ln = releases.length;
    var n = 0;

    var r = 10;
    var a = 10;

    // var abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    artists.forEach(data => {
        database('artists/' + a + "-" + data.id, data);
        a++;
    });

    releases.forEach(data => {
        database('releases/' + r + "-" + data.id, data, true);
        r++;
    });
}