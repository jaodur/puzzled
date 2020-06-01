import rx

from .redis import RedisConnection

poll_cache = {}


def poll_redis_stream(stream_name, parse_channel_messages, get_stream_key=lambda key: key):
    if poll_cache.get(stream_name):
        return poll_cache[stream_name]

    seen_id = None
    key = get_stream_key(stream_name)
    connection = RedisConnection()

    def update_seen_id(stream_event):
        nonlocal seen_id
        if seen_id is None or stream_event.id > seen_id:
            seen_id = stream_event.id

    def disconnect():
        connection.quit()
        del poll_cache[stream_name]

    poll_cache[stream_name] = (
        rx.Observable.of(None)
        .expand(lambda: rx.Observable.from_future(connection.xread(10000, {'key': key, 'id': seen_id})))
        .filter(lambda streams: streams)
        .flat_map(lambda streams: streams)
        .flat_map(lambda stream: stream[1])
        .map(lambda stream_event: parse_channel_messages(stream_event, stream_name))
        .do_action(update_seen_id)
        .finally_action(disconnect)
        .publish()
        .ref_count()
    )

    return poll_cache[stream_name]
