const fs = require('fs');

module.exports = (id, folder) => {
    const files = fs.readdirSync(folder);
    
    files.forEach(file => {
        let ids = file.slice(11).split(".")[0];
        if (id == ids) {
            id = file;
        }
    });
    return id;
}