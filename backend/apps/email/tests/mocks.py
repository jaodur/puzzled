import importlib


def mock_django_q_async_send_message(func_path, *args, **kwargs):

    try:
        module = importlib.import_module(func_path)

    except ModuleNotFoundError:
        split_func_path, *other = func_path.rpartition('.')
        module = importlib.import_module(split_func_path)

    return module.send_message(*args, **kwargs)
