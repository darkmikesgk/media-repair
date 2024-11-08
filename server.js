require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Замените на ваш доверенный домен
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

app.options('*', cors(corsOptions)); // Обработка префлайт-запросов

app.post('/send-email', (req, res) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'vany2008@yandex.ru',
        subject: 'Новая заявка на звонок',
        text: `Имя: ${name}\nТелефон: ${phone}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        }
        res.json({ success: true, message: 'Email sent: ' + info.response });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


//остались мутки с CORS, но пока что работает отправка на почту
