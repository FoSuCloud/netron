''' Python Server publish script '''

import json
import os
import re
import sys
import shutil
import subprocess

root_dir = os.path.dirname(os.path.abspath(__file__))
dist_dir = os.path.join(root_dir, 'dist')
dist_pypi_dir = os.path.join(dist_dir, 'pypi')
source_dir = os.path.join(root_dir, 'source')
publish_dir = os.path.join(root_dir, 'publish')


def _read(path):
    with open(path, 'r', encoding='utf-8') as file:
        return file.read()


def _write(path, content):
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)


def _update(path, regex, value):
    content = _read(path)

    def repl(match):
        return match.group(1) + value + match.group(3)

    content = re.sub(regex, repl, content)
    _write(path, content)


def _build():
    ''' Build dist/pypi '''
    shutil.rmtree(os.path.join(source_dir, '__pycache__'), ignore_errors=True)  # 删除目录__pycache__
    shutil.rmtree(dist_pypi_dir, ignore_errors=True)  # 删除dist目录下的pypi目录
    shutil.copytree(source_dir, os.path.join(dist_pypi_dir, 'netron'))  # 复制源代码到dist目录
    shutil.copyfile(os.path.join(publish_dir, 'setup.py'), os.path.join(dist_pypi_dir, 'setup.py'))  # 复制setup.py
    os.remove(os.path.join(dist_pypi_dir, 'netron', 'electron.js'))  # 删除dist/pypi/netron/下的脚本
    os.remove(os.path.join(dist_pypi_dir, 'netron', 'app.js'))  # 删除dist/pypi/netron/下的脚本


def _install():
    ''' Install dist/pypi '''
    args = ['python', '-m', 'pip', 'install', dist_pypi_dir]
    try:
        subprocess.run(args, check=False)
    except (KeyboardInterrupt, SystemExit):
        pass


def _version():
    ''' Update version '''
    package = json.loads(_read('./package.json'))
    _update('./dist/pypi/setup.py', '(    version=")(.*)(",)', package['version'])
    _update('./dist/pypi/netron/server.py',
            "(__version__ = ')(.*)(')",
            package['version'])
    _update('./dist/pypi/netron/index.html',
            '(<meta name="version" content=")(.*)(">)',
            package['version'])
    _update('./dist/pypi/netron/index.html',
            '(<meta name="date" content=")(.*)(">)',
            package['date'])


def _start():
    ''' Start server '''
    # args = [ sys.executable, '-c', 'import netron; netron.main();' ] + sys.args
    # try:
    #     subprocess.run(args, env={ 'PYTHONPATH': './dist/pypi' }, check=False)
    # except (KeyboardInterrupt, SystemExit):
    #     pass
    # 代码将dist/pypi目录添加到Python的模块搜索路径的最前面。这样，当导入netron模块时，Python会首先在dist/pypi目录下查找。
    sys.path.insert(0, os.path.join(root_dir, 'dist', 'pypi'))
    __import__('netron').main()  # 执行dist/pypi下netron代码
    # 这个main函数是netron模块的主入口点，它处理命令行参数，并根据参数的值执行相应的操作，如启动服务器、停止服务器等。
    # source init.py
    sys.args = []
    del sys.argv[1:]


def main():  # pylint: disable=missing-function-docstring
    table = {'build': _build, 'install': _install, 'version': _version, 'start': _start}
    sys.args = sys.argv[1:]  # 保存命令行参数
    while len(sys.args) > 0:
        command = sys.args.pop(0)
        del sys.argv[1]
        table[command]()  # 执行对应命令，如 build,start


if __name__ == '__main__':
    main()
