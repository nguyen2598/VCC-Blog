const fileController = {
    upload: (req, res) => {
        console.log('daaaa', req.file);
        if (!req.file) {
            return res.status(400).send('ko co file, No file uploaded.');
        }
        res.send({
            filename: req.file.filename,
            path: req.file.path,
        });
    },
};
module.exports = fileController;
