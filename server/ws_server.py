import asyncio
import websockets


@asyncio.coroutine
def hello(websocket, uri):
    name = yield from websocket.recv()
    print("< {}".format(name))
    greeting = "Hello {}!".format(name)
    print("> {}".format(greeting))
    yield from websocket.send(greeting)

start_server = websockets.serve(hello, '0.0.0.0', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()