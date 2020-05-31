import json
import os
from decouple import config

from backend.lib import first

# A local configuration file name
LOCAL_CONFIG_FILE_NAME = '.config.json'


class JsonConfigPathError(Exception):
    pass


def load_json_settings():
    """
    This method is responsible for finding a JSON-based settings file and
    loading it into a nice Mash that we can then use to get values from. This
    method is critical to the new settings.py logic an the configuration of our
    application.

    The logic decides on the best configuration file to use by looking for it
    in the following locations:

        1. Path specified by OS environment variable called
           'DYNAMIC_CONFIGURATION_FILE'
        2. The root of the project in a file called .config.json

    Once a file is found it is loaded and returned.
    :return: dict
    """
    potential_locations = [
        config('DYNAMIC_CONFIGURATION_FILE', None),
        os.path.join(os.getcwd(), LOCAL_CONFIG_FILE_NAME),
    ]

    # Weed out any None values, if they exist.  No reason to even check, nor
    # show it in error messages later.
    potential_locations = [pl for pl in potential_locations if pl is not None]

    # Use a clever little bit of lambda logic to find the first one we like.
    file_location = first(potential_locations, key=lambda x: os.path.exists(x))

    # Print out an error that we can't find the file anywhere.  We aren't going
    # to throw an exception, because we hope that the default settings are
    # enough.
    if file_location is None:
        print('Unable to find a JSON settings file.')
        print('Please set DYNAMIC_CONFIGURATION_FILE to a valid path or place '
              'the configuration file at one of the following locations:')
        for location in potential_locations:
            print(' * {}'.format(location))
        print('This error is most likely popping up because you don\'t have a local config file.')

        # And exit out.
        raise JsonConfigPathError('Unable to find a JSON settings file.')

    # Ok, we have a file location, lets see if we can load it and parse it.
    try:
        with open(file_location) as file_handle:
            output = json.load(file_handle)

        output = output.get('settings', {})

    except Exception as e:
        # Just re-raise this so that we have intelligent error information for
        # the developer that screwed up somewhere.
        raise Exception(u'Unable to load and parse file at {}: {}'.format(file_location, e.message))

    return output


settings_json = load_json_settings()
