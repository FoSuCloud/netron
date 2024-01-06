const fs = require('fs');
const host = require('./browser');
const view = require('./view');
const base = require('./base');

const args = process.argv;
if (!args.length || args.length < 3) {
    console.log('param is empty');
}
const filePath = args[2];

const fileName = filePath.split('/').pop();
const readStream = fs.createReadStream(filePath);

const selfHost = new host.BrowserHost();
selfHost.initView(new view.View(selfHost));

const fileChunks = [];
readStream.on('data', (chunk) => {
    fileChunks.push(chunk);
});

readStream.on('end', () => {
    readStream.close();
    const buffer = new base.BinaryStream(
        new Uint8Array(Buffer.concat(fileChunks))
    );
    selfHost
        .scan(buffer, fileName)
        .then((model) => {
            console.log(
                JSON.stringify({ code: 0, msg: 'scan success', model: model })
            );
        })
        .catch((err) => {
            if (!err) {
                console.log(JSON.stringify({code: 1, msg: 'not support file type', err: err }));
            } else {
                const errorText = err.message;
                if (errorText === 'File has no content.') {
                    console.log(
                        JSON.stringify({ code: 2, msg: 'file content is empty', err: err })
                    );
                } else {
                    console.log(JSON.stringify({ code: 3, msg: 'file scan fail', err: err }));
                }
            }
        });
});
