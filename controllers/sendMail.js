const nodemailer = require('nodemailer');

const sendMail = async (req, res) => {
    const { name, from, to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_LOGIN,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = { 
        from, 
        to, 
        subject, 
        html: `
        <html lang="en">
            <head>
                <style>
                    * {font-family: 'Arial';}
                    p {font-size: 1.5rem; border-bottom: 1px solid gray;}
                    p b {color: blue; width: 200px; display: inline-block; border-right: 1px solid gray;}
                </style>
            </head>
            <body>
                <p><b>Sender name:</b> ${name}</p>
                <p><b>Subject:</b> ${subject}</p>
                <p><b>Message:</b> ${text}</p>
            </body>
        </html>
        `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
        message: 'Email sent successfully',
    })
};

module.exports = {
    sendMail,
}
