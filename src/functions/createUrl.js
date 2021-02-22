const fetch = require('node-fetch');

module.exports = (url, code) => {
    const domain = "go.xpend.co";
    const cc = "8fb16730748911eba3b9fa163e5bfd49";
    setTimeout(function () {
        fetch(`https://shortener.godaddy.com/v1/?apikey=${cc}&domain=${domain}&url=${url}&code=${code}`)
            .then(res => res.text())
            .then(body => console.log(body))
            .catch(err => console.error(err));
    }, 400);
}