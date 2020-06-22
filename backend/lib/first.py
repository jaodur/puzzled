def first(iterable, default=None, key=None):
    """Return first element of `iterable` that evaluates true, else return None (or an optional default value)."""

    if key is None:
        for el in iterable:
            if el:
                return el
    else:
        for el in iterable:
            if key(el):
                return el

    return default
