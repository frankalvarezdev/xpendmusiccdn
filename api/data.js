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

module.exports = (req, res) => {
    if (req.method === 'GET') {
        var dt = null;
        if (req.query.d == "releases") {
            dt = "/releases/";
        } else if (req.query.d == "artists") {
            dt = "/artists/";
        }

        if (req.query.max_results) {
            firebase.database().ref(dt).limitToFirst(parseInt(req.query.max_results)).once('value', (snapshot) => {
                var arr = [];
                snapshot.forEach((childSnapshot) => {
                    arr.push(childSnapshot.val());
                });

                res.json(arr);
            });
        } else {
            firebase.database().ref(dt).once('value', (snapshot) => {
                var arr = [];
                snapshot.forEach((childSnapshot) => {
                    arr.push(childSnapshot.val());
                });

                res.json(arr);
            });
        }
    }
}