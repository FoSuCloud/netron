const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080; // 设置端口号，可以根据需要更改

// 处理根路径请求，返回前端项目的入口 HTML 文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// 处理 browser.js 请求
app.get('browser.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'browser.js'));
});
// 设置静态资源目录，这里假设前端项目的静态文件位于 当前相对 文件夹下
app.use(express.static(path.join(__dirname)));

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
