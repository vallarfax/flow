from kombu import Connection


context = {
    'host': '192.168.33.190',
    'user': 'admin',
    'password': 'JtPumIoc0RnB',
    'port': 5672,
    }
connection_string = 'amqp://{user}:{password}@{host}:{port}//'.format(**context)


with Connection(connection_string) as conn:
    simple_queue = conn.SimpleQueue('simple_queue')
    message = simple_queue.get(block=True, timeout=1)
    print("Received: %s" % message.payload)
    message.ack()
    simple_queue.close()
