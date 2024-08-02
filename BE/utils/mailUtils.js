const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASS,
    },
});

// Tạo mã xác nhận ngẫu nhiên
function generateVerificationCode() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }
    console.log({ date: Date.now() });
    return {
        code,
        createAt: Date.now(),
        expiration: Date.now() + 5 * 60 * 1000, // Thời gian hết hạn là 5 phút
    };
}

// Gửi email xác nhận
function sendVerificationEmail(email, code, cb) {
    console.log('gui mail');
    const mailOptions = {
        from: process.env.GMAIL_NAME,
        to: email,
        subject: 'Xác nhận tài khoản',
        html: `Mã xác nhận của bạn là: <span style="padding:1px 16px; border:1px solid #ccc;">${code}</span> \nmã sẽ hết hạn trong 5 phút vui lòng nhập sớm`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            cb(0);
        } else {
            console.log('thanh cong');
            cb(1);
        }
    });
}
module.exports = {
    generateCode: generateVerificationCode,
    sendMail: sendVerificationEmail,
};
