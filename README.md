#### 支持的平台
1. Web端
Web端的实现主要在 `source/server.py`
中。这个文件定义了一个HTTP服务器，用于处理客户端的请求并返回相应的内容。服务器使用Python的内置库http.server和socketserver来实现。当用户请求一个模型文件时，服务器会读取该文件并将其内容返回给客户端。

2. 桌面端
桌面端的实现主要依赖于Electron框架。Electron是一个使用JavaScript、HTML和CSS构建跨平台桌面应用的开源框架。
Netron的Electron应用的入口点是`source/electron.js`文件。这个文件创建了一个Electron应用，并定义了应用的行为，例如窗口的创建、菜单的设置等。
在打包桌面应用时，Netron使用electron-packager和electron-builder这两个工具。
electron-packager可以将Electron应用打包成一个独立的可执行文件，而electron-builder则可以将应用打包成一个安装包。

3. 其他平台
Netron还支持通过Python命令行工具来查看模型。这是通过在setup.py文件中定义一个控制台脚本来实现的。当用户安装Netron Python包时，这个脚本会被安装到Python的脚本目录中，用户可以直接在命令行中运行这个脚本来查看模型。


#### 本地打包pip包
克隆Netron的源代码：
`git clone https://github.com/lutzroeder/netron.git`
进入Netron的源代码目录：
`cd netron`
安装必要的Python包：
`pip install -r requirements.txt`
运行package.py脚本来打包Netron：
`python package.py build`
这个命令会构建Netron的Python包，并将其保存到dist/pypi目录中。

安装打包好的Netron：
* 在win10，需要进入command prompt执行
`pip install dist/pypi`
这个命令会从dist/pypi目录中安装Netron的Python包。

完成以上步骤后，你就可以在命令行中运行netron命令来查看模型了。
`netron third_party/test/onnx/candy.onnx`
然后提示Serving 'third_party/test/onnx/candy.onnx' at http://localhost:8080
还是要在网页上查看

#### 混淆
* terser source/*.js -o output.js

#### 打包
* pkg 打包工具`默认情况下不会将源代码文件直接打包进可执行文件中`。它通常会将可执行文件与源代码文件分开，以保持可执行文件的大小较小。
* 你可以使用 --output 标志来指定输出的可执行文件名称，`并将源代码文件包含在其中`
* pkg . -t node18-win-x64 --output model-view.exe

* pkg . -t node18-win-x64 默认

* 但是为了可以配置assets资源，我们还需要在package.json配置pkg配置
* 改为使用 `pkg package.json`打包

#### 运行
*  .\dist\netron.exe 运行
