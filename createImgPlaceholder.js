const resizeImg = require('resize-img');
const imgFolder = 'src/static/media';
const fs = require('fs');

module.exports = () => {
    if (!fs.existsSync('dist/media/placeholder/')) {
        fs.mkdirSync('dist/media/placeholder/');
    }

    const createImgPlaceholder = async (file, id) => {
        const image = await resizeImg(fs.readFileSync(file), {
            height: 40,
            format: "jpg"
        });
        fs.writeFileSync("dist/media/placeholder/" + id, image);
    }

    fs.readdir(imgFolder, (err, files) => {
        files.forEach(file => {
            createImgPlaceholder(imgFolder + "/" + file, file);
        })
    });
}