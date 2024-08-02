require('dotenv').config({
    path: './.env',
});

// hihi  tạo thư mục lưu file start
const path = require('path');
//hihi  tạo thư mục lưu file end

const cors = require('cors');
require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('routes/api');
const { swaggerUIServe, swaggerUISetup } = require('kernels/api-docs');

const app = express();
app.disable('x-powered-by');
app.use(cors());
// app.use(
//     cors({
//         origin: '*',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     }),
// );
// hihi  tạo thư mục lưu file start
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// hihi  tạo thư mục lưu file end

app.use(bodyParser.json());
app.use('/api/v1', router);
app.use(express.json());

app.use('/api-docs', swaggerUIServe, swaggerUISetup);

app.use('/api/v1/uploads', express.static(uploadDir));

module.exports = app;
