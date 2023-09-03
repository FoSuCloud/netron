''' Python Server entry point '''

import argparse
import sys
import os

from .server import start
from .server import stop
from .server import status
from .server import wait
from .server import serve
from .server import __version__

def main():
    ''' main entry point '''
    parser = argparse.ArgumentParser(
        description='Viewer for neural network, deep learning and machine learning models.')
    parser.add_argument('file',
        metavar='MODEL_FILE', help='model file to serve', nargs='?', default=None)
    parser.add_argument('-b', '--browse', help='launch web browser', action='store_true')
    parser.add_argument('-p', '--port', help='port to serve', type=int)
    parser.add_argument('--host', metavar='ADDR', help='host to serve', default='localhost')
    parser.add_argument('--verbosity',
        metavar='LEVEL', help='output verbosity (quiet, default, debug)',
        choices=[ 'quiet', 'default', 'debug', '0', '1', '2' ], default='default')
    parser.add_argument('--version', help="print version", action='store_true')
    args = parser.parse_args()
    # 检查用户提供的模型文件是否存在。如果args.file有值并且文件不存在，程序将打印错误信息并退出
    if args.file and not os.path.exists(args.file):
        print("Model file '" + args.file + "' does not exist.")
        sys.exit(2)
    if args.version:
        print(__version__)
        sys.exit(0)
    address = (args.host, args.port) if args.host else args.port if args.port else None
    # 启动服务器，会新建一个线程
    start(args.file, address=address, browse=args.browse, verbosity=args.verbosity)
    # 等待服务器停止，阻塞当前进程
    wait()
    sys.exit(0)

if __name__ == '__main__':
    main()
