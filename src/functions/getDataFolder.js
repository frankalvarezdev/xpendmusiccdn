const metadataParser = require('markdown-yaml-metadata-parser');
const fs = require('fs');

module.exports = (folder, content = false) => {
    let data = [];
    const files = fs.readdirSync(folder);
    files.forEach(file => {
        let rawdata = fs.readFileSync(folder + file, 'utf-8'),
            result = metadataParser(rawdata),
            id = file.slice(11).split(".")[0],
            date = file.split("-");
        date = { date: date[2] + "-" + date[1] + "-" + date[0] }
        result.metadata = { ...{ id: id }, ...result.metadata, ...date};
        if (content) {
            data.push(result);
        } else {
            data.push(result.metadata);
        }
    });
    return data;
}