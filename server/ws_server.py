import asyncio

from websocket_helpers import (
    BaseWsHandler,
    Application
)


class MyHandler(BaseWsHandler):
    @asyncio.coroutine
    def on_open(self):
        print('connection opened.')

    @asyncio.coroutine
    def on_close(self):
        print('connection closing...')

    @asyncio.coroutine
    def on_message(self, message):
        print('< {}'.format(message))


if __name__ == '__main__':
    app = Application(MyHandler, '0.0.0.0', 8765)
    app.run()
