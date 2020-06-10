from pickle import loads, dumps
from django.conf import settings
from redis import StrictRedis


class RedisConnection(object):
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not RedisConnection._instance:
            cls._instance = StrictRedis.from_url(settings.REDIS_URL)
        return cls._instance

    @staticmethod
    def normalize_redis_key(key):
        if settings.REDIS_CACHE_PREFIX:
            key = u'{}:{}'.format(settings.REDIS_CACHE_PREFIX, key)
        return key


class RedisStream:
    """Class to work with redis stream data"""

    def __init__(self, name_prefix, conn=RedisConnection()):
        """
        Args:
            name_prefix (str): prefix for redis stream names for easy differentiation
            conn: redis connection
        """
        self.conn = conn
        self.name_prefix = name_prefix

    def add(self, stream_name, fields, id='*', max_len=None, approximate=True, serializer=dumps):
        """ Method to add fields to a given stream
        Args:
            stream_name (str): the name of the targeted stream
            fields (dict): key/value pairs to insert into the stream
            id (str): Location in the stream to insert this record. By default it is appended
            max_len (int): truncate old stream members beyond this size
            approximate (bool): actual stream length may be slightly more than max_len
            serializer (func): function to serialise complex python objects before dumping to redis. pickle is default
        """
        fields = {f'{key}': serializer(value) for key, value in fields.items()}
        return self.conn.xadd(
            self.normalized_name(stream_name),
            fields,
            id=id,
            maxlen=max_len,
            approximate=approximate
        )

    def read(self, streams, count=None, block=None, deserializer=loads):
        """ Method to add fields to a given stream
        Args:
            streams (dict): a dict of stream names to stream IDs, where IDs indicate the last ID already seen.
            count (int): if set, only return this many items, beginning with the earliest available
            block (int): number of milliseconds to wait, if nothing already present
            deserializer (func): function to deserialize redis objects into python objects
        """
        streams = {f'{self.normalized_name(stream_name)}': id for stream_name, id in streams.items()}
        flat_streams_output = self.conn.xread(streams, count=count, block=block)

        # need to deserialize values before returning. there must be a better way!
        return [
            [
                stream_name,
                [
                    (redis_key, {key: deserializer(value) for key, value in fields.items()})
                    for redis_key, fields in fields
                ]
            ]
            for stream_name, fields in flat_streams_output
        ]

    def normalized_name(self, name):
        return f'{self.name_prefix}:{name}'
