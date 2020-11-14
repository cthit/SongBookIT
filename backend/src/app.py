from web_handler import host
from src.setup.setup import setup_db

if __name__ == '__main__':
    setup_db(reset=False)
    host()
