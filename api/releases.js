module.exports = (req, res) => {
    if (req.method === 'GET') {
        res.json([
            {name: "Frank", location: "Peru"}
        ])
    } else {
        
    }
}