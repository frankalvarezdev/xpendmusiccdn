const fetch = require('node-fetch');

module.exports = (req, res) => {
    if (req.method === 'GET') {
        var url = null;
        if (req.query.d == "releases") {
            url = "https://cdn-v2.xpendmusic.com/r_data.json";
        } else if (req.query.d == "artists") {
            url = "https://cdn-v2.xpendmusic.com/a_data.json";
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (req.query.max_results && !req.query.slice && !req.query.id) {
                    data = data.slice(0, req.query.max_results);
                } else if (req.query.slice && !req.query.max_results && !req.query.id) {
                    let n = req.query.slice.split("-");
                    if (n[1] != undefined) {
                        data = data.slice(parseInt(n[0]), parseInt(n[1]))
                    } else {
                        data = data.slice(parseInt(n[0]))
                    }
                }
                res.json(data);
            });
    }
}