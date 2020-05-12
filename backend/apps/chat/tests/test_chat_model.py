from .fixtures import message, channel, user


class TestChatChannelModel:
    def test_repr_representation(self, channel):
        assert repr(channel) == '<ChatChannel id={!r}>'.format(channel.id)


class TestMessageModel:
    def test_repr_representation(self, message):
        assert repr(message) == '<Message id={!r}>'.format(message.id)
