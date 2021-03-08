from web_handler import host
from setup.setup import setup_db

if __name__ == '__main__':
    setup_db(reset=True)
    host()
