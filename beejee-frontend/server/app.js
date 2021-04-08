const express =  require('express');
const dotenv =  require('dotenv');
dotenv.config();
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://localhost:9090/',
        changeOrigin: true,
        pathRewrite: {
            '^/api/': '/',
        }
    })
);
app.use('/', express.static(__dirname + '/../build/'));
app.listen(process.env['FRONTEND_PORT'] || 3000, () => console.log('frontend serving'));