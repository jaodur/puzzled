from abc import ABCMeta, abstractmethod
from pickle import loads, dumps


class AbstractEncoder(metaclass=ABCMeta):

    @abstractmethod
    def encode(self, input_data):
        """Abstract method for encoding input data
        Args:
            input_data: python object to be encoded
        """

    @abstractmethod
    def decode(self, encoded_data):
        """Abstract method for decoding encoded data
        Args:
            encoded_data: data to be decoded into a python object
        """


class BaseEncoder(AbstractEncoder):
    """Class for encoding and decoding of data stored on different platforms (serialise complex python objects
    to other object types such as redis. pickle is default)
    """

    def __init__(self, encoder=dumps, decoder=loads):
        """
        Args:
            encoder: function to encode data
            decoder: function to decode data
        """
        self.encoder = encoder
        self.decoder = decoder

    def encode(self, input_data):
        """Method for encoding input data
        Args:
            input_data: python object to be encoded
        """
        return self.encoder(input_data)

    def decode(self, encoded_data):
        """Abstract method for decoding encoded data
        Args:
            encoded_data: data to be decoded into a python object
        """
        return self.decoder(encoded_data)
