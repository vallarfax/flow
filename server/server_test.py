from kombu import Connection
import datetime


context = {
    'host': '192.168.33.190',
    'user': 'admin',
    'password': 'password',
    'port': 5672,
}
connection_string = 'amqp://{user}:{password}@{host}:{port}//'.format(**context)


with Connection(connection_string) as conn:
    simple_queue = conn.SimpleQueue('simple_queue')
    message = 'hello, sent at %s' % datetime.datetime.today()
    simple_queue.put(message)
    print('Sent: %s' % message)
    simple_queue.close()
