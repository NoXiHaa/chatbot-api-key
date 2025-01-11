const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/chat', async (req, res) => {
    const apiKey = process.env.API_KEY_NOXMEDIA;
    const message = req.query['message'];

    if (!apiKey || !message) {
        return res.status(400).json({ error: "API Key và message là bắt buộc" });
    }

    // Gọi API của Noxmedia.
    try {
        // Đổi https://you_url_api_chat/ thành url api chat của bạn.
        const response = await fetch(`https://you_url_api_chat/api/chat?n-x-h=${apiKey}&message=${encodeURIComponent(message)}`);
        const data = await response.json();

        res.json({
            userMessage: message,
            botResponse: data.botResponse || "Không có phản hồi từ bot."
        });
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        res.status(500).json({ error: "Có lỗi xảy ra khi gọi API." });
    }
});

app.get('/', (req, res) => {
    res.render('index', { userMessage: null, botResponse: null });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
