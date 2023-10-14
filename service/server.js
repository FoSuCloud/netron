const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 配置静态文件目录，用于存放 HTML 文件
app.use(express.static(path.join(__dirname, 'public')));

// 定义 GET 请求处理程序
app.get('/model-view/:file', (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, 'public', fileName);

    // 发送 HTML 文件作为响应
    res.sendFile(filePath);
});

// 启动服务器
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
});
