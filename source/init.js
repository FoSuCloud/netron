const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 获取请求的 URL
    const url = req.url;

    // 根据请求的 URL 决定文件路径，默认为 'index.html'
    const filePath = url === '/' ? 'index.html' : url;

    // 构建完整的文件路径
    const fullFilePath = path.join(__dirname, filePath);

    // 检查文件是否存在
    fs.access(fullFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            // 文件不存在，返回 404 Not Found
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            // 文件存在，读取并返回文件内容
            fs.readFile(fullFilePath, 'utf8', (err, data) => {
                if (err) {
                    // 读取文件出错，返回 500 Internal Server Error
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    // 根据文件类型设置响应头
                    const contentType = getContentType(filePath);
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        }
    });
});

const port = 8080;
server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
});

// 根据文件扩展名获取相应的 MIME 类型
function getContentType(filePath) {
    const extname = path.extname(filePath).toLowerCase();
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        default:
            return 'text/plain';
    }
}
