const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const API_KEY = 'sk-6A3c638NWalOkaIcXjK1mYoVeMDQNPmpK7YxB6EhWGQtA0rf';
const API_BASE_URL = 'https://api.chatanywhere.cn/v1';

const messageCache = new Map();

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const cacheKey = message.trim().toLowerCase();
        if (messageCache.has(cacheKey)) {
            console.log('Using cached response');
            return res.json({ 
                reply: messageCache.get(cacheKey),
                cached: true 
            });
        }

        const response = await axios.post(`${API_BASE_URL}/chat/completions`, {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 1000,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        const reply = response.data.choices[0].message.content;
        
        messageCache.set(cacheKey, reply);
        if (messageCache.size > 50) {
            const firstKey = messageCache.keys().next().value;
            messageCache.delete(firstKey);
        }

        res.json({ reply });

    } catch (error) {
        console.error('API error:', error.response?.data || error.message);
        
        let errorMessage = '抱歉，发生了一些错误，请稍后再试。';
        let statusCode = 500;

        if (error.response?.status === 429) {
            errorMessage = '请求过于频繁，请稍等片刻再试。';
            statusCode = 429;
        } else if (error.code === 'ECONNABORTED') {
            errorMessage = '请求超时，请重试。';
            statusCode = 504;
        }

        res.status(statusCode).json({ error: errorMessage });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('API configured and ready');
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Performing graceful shutdown...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
}); 