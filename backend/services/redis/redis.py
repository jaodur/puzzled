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
