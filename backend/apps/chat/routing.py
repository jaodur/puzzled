from graphene_django_subscriptions.consumers import GraphqlAPIDemultiplexer
from channels.routing import route_class
from .subscriptions import ChannelSubscription,  MessageSubscription


class ChatDemultiplexer(GraphqlAPIDemultiplexer):
    consumers = {
      f'{ChannelSubscription._meta.stream}': ChannelSubscription.get_binding().consumer,
      f'{MessageSubscription._meta.stream}': MessageSubscription.get_binding().consumer,
    }


app_routes = [
    route_class(ChatDemultiplexer)
]
