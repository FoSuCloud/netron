const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// static file path
app.use(express.static(path.join(__dirname)));

// start serve
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
