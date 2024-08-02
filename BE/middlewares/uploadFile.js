const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('vo a');
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log('vo b');

        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
module.exports = upload;
