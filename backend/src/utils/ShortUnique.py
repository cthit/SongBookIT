import string
from random import choices


def short_unique_id():
    alphabet = string.ascii_lowercase
    return ''.join(choices(alphabet, k=4))

