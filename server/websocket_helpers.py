import signal
import asyncio

import websockets


class BaseWsHandler:
    def __init__(self, protocol):
        self.protocol = protocol

    @asyncio.coroutine
    def on_open(self):
        pass

    @asyncio.coroutine
    def on_close(self):
        pass

    @asyncio.coroutine
    def on_message(self, message):
        pass

    @asyncio.coroutine
    def _check_messages(self):
        while True:
            msg = yield from self.protocol.recv()

            if not msg:
                # that's all folks
                return
            yield from self.on_message(msg)


class FlowProtocol(websockets.WebSocketServerProtocol):
    def __init__(self, flow_handler):
        self.flow_handler = flow_handler
        super().__init__()

    @asyncio.coroutine
    def handler(self):
        try:
            uri = yield from self.handshake()
        except Exception as exc:
            self.writer.write_eof()
            self.writer.close()
            return

        # print('handshake complete')

        try:
            flow_handler = self.flow_handler(self)
        except Exception:
            yield from self.fail_connection(1011)
            return

        yield from flow_handler.on_open()

        # print('connection opened')

        try:
            yield from flow_handler._check_messages()
        except Exception:
            yield from self.fail_connection(1011)
            return

        yield from flow_handler.on_close()

        # print('connection closed')

        try:
            yield from self.close()
        except Exception as exc:
            self.writer.write_eof()
            self.writer.close()
            return


class Application:
    def __init__(self, handler, host, port):
        self.handler = handler
        self.host = host
        self.port = port

    def _start_server(self, loop, host, port):
        f = loop.create_server(lambda: FlowProtocol(self.handler), host, port)
        # f = loop.create_server(FlowProtocol, host, port)
        s = loop.run_until_complete(f)

    def run(self):
        print('starting app')

        loop = asyncio.get_event_loop()

        # Ctrl-C handler
        if signal is not None:
            loop.add_signal_handler(signal.SIGINT, loop.stop)

        self._start_server(loop, self.host, self.port)

        loop.run_forever()
