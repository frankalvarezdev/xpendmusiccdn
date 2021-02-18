var firebase = require('firebase/app');
require('firebase/database');

var app = firebase.initializeApp({
    apiKey: "AIzaSyDBNZZPmc1QPfZ5sDsWwkCp7mObQ0nwW9o",
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
                process.exit();
            }
        }
    }
    var ln = releases.length;
    var n = 0;
    artists.forEach(data => {
        database('artists/' + data.id, data);
    });

    releases.forEach(data => {
        database('releases/' + data.id, data, true);
    });
}