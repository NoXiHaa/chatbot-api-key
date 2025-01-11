const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config(); // Nạp biến môi trường từ file .env

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint API chat
app.get('/api/chat', async (req, res) => {
    const apiKey = process.env.API_KEY_NOXMEDIA; // API Key từ .env
    const message = req.query['message']; // Lấy tham số 'message' từ query string

    if (!apiKey || !message) {
        return res.status(400).json({ error: "API Key và message là bắt buộc" });
    }

    try {
        // Thay https://you_url_api_chat/ bằng url api chat của bạn
        const response = await fetch(`https://you_url_api_chat/api/chat?n-x-h=${apiKey}&message=${encodeURIComponent(message)}`);
        const data = await response.json();

        // Trả về kết quả JSON
        res.json({
            userMessage: message,
            botResponse: data.botResponse || "Không có phản hồi từ bot."
        });
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        res.status(500).json({ error: "Có lỗi xảy ra khi gọi API." });
    }
});

// Trang chủ để nhập liệu và gửi yêu cầu
app.get('/', (req, res) => {
    res.render('index', { userMessage: null, botResponse: null });
});

// Lắng nghe yêu cầu từ client
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
