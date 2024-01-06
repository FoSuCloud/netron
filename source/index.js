/* eslint-env es2015 */

if (window.location.hostname.endsWith('.github.io')) {
    window.location.replace('https://netron.app');
}
function getQueryParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}
window.require = function(id, callback) {
    var name = id.startsWith('./') ? id.substring(2) : id;
    var value = window[name];
    if (callback) {
        if (value && id !== 'browser') {
            return callback(value);
        }
        window.module = { exports: {} };
        var url = new URL(id + '.js', window.location.href).href;
        var script = document.createElement('script');
        script.setAttribute('id', id);
        script.setAttribute('type', 'text/javascript');
        /* eslint-disable no-use-before-define */
        var loadHandler = function() {
            script.removeEventListener('load', loadHandler);
            script.removeEventListener('error', errorHandler);
            var module = window[name];
            if (!module) {
                module = window.module.exports;
                window[name] = module;
            }
            delete window.module;
            callback(module);
        };
        var errorHandler = function(e) {
            script.removeEventListener('load', loadHandler);
            script.removeEventListener('error', errorHandler);
            document.head.removeChild(script);
            delete window.module;
            callback(null, new Error('The script \'' + e.target.src + '\' failed to load.'));
        };
        /* eslint-enable no-use-before-define */
        script.addEventListener('load', loadHandler, false);
        script.addEventListener('error', errorHandler, false);
        script.setAttribute('src', url);
        document.head.appendChild(script);
        return null;
    }
    if (!value) {
        throw new Error("Module '" + id + "' not found.");
    }
    return value;
};

window.preload = function(callback) {
    var modules = [
        [ 'view', 'browser' ],
        [ 'json', 'xml', 'protobuf', 'hdf5', 'grapher' ],
        [ 'base', 'text', 'flatbuffers', 'flexbuffers', 'zip',  'tar', 'python', 'dagre' ]
    ];
    var next = function() {
        if (modules.length === 0) {
            callback();
            return;
        }
        var ids = modules.pop();
        var resolved = ids.length;
        for (var i = 0; i < ids.length; i++) {
            window.require(ids[i], function(module, error) {
                if (error) {
                    callback(null, error);
                    return;
                }
                resolved--;
                if (resolved === 0) {
                    next();
                }
            });
        }
    };
    next();
};

window.terminate = function(message, action, callback) {
    document.getElementById('message-text').innerText = message;
    var button = document.getElementById('message-button');
    if (action) {
        button.style.removeProperty('display');
        button.innerText = action;
        button.onclick = function() {
            callback();
        };
        button.focus();
    } else {
        button.style.display = 'none';
        button.onclick = null;
    }
    if (window.__view__) {
        try {
            window.__view__.show('welcome message');
        } catch (error) {
            // continue regardless of error
        }
    }
    document.body.setAttribute('class', 'welcome message');
};

window.addEventListener('error', (event) => {
    var error = event instanceof ErrorEvent && event.error && event.error instanceof Error ? event.error : new Error(event && event.message ? event.message : JSON.stringify(event));
    window.terminate(error.message);
});

window.addEventListener('load', function() {
    if (!Symbol || !Symbol.asyncIterator) {
        throw new Error('Your browser is not supported.');
    }
    window.preload(async function(value, error) {
        if (error) {
            window.terminate(error.message);
        } else {
            var host = new window.host.BrowserHost();
            var view = require('./view');
            window.__view__ = new view.View(host);
            await requestModel();
            window.__view__.start();
        }
    });
});
function requestModel() {
    return new Promise((resolve, reject) => {
            let path = getQueryParam('path');
            if (!path) {
                alert('Model file does not exist');
                return reject();
            }
            let request = new XMLHttpRequest();
            request.onload = () => {
                if (request.status === 200) {
                    let fileName = request.getResponseHeader('file-name');
                    // eslint-disable-next-line no-undef
                    const context = new host.BrowserHost.BrowserContext(
                        this,
                        '',
                        fileName,
                        new host.BrowserHost.BinaryStream(new Uint8Array(request.response))
                    );
                    window.__view__
                        .open(context)
                        .then((model) => {
                            window.__view__.show(null);
                            this.document.title = fileName;
                            window.__view__.toggleAttributes();
                            resolve(model);
                        })
                        .catch((e) => {
                            alert('The model file parsing failed, please check whether the model file is correct.');
                            reject(e);
                        });
                } else {
                    alert(request.response);
                    reject(request.response);
                }
            };
            request.onerror = (e) => {
                alert('Requesting model file failed, please check the network refresh and try again');
                reject(e);
            };
            request.ontimeout = () => {
                request.abort();
                alert('Requesting model file timed out');
                reject();
            };
            // download model file
            request.open('POST', 'http://127.0.0.1:9000/argus/execute' , true);
            request.setRequestHeader("content-type",'application/json');
            const body = {
                "path": "modelchecking/1.0.0/model-checking/file",
                "params":{
                    "path":path
                }
            }
            request.send(JSON.stringify(body));
        }
    )
}
