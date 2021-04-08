import os

# SECURITY
API_KEY = os.environ.get('SONGBOOK_API_KEY', 'SUPERSECRETKEY')

# POSTGRES SETTINGS
POSTGRES_USER = os.environ.get('SONGBOOK_POSTGRES_USER', 'songbook')
POSTGRES_PASSWORD = os.environ.get('SONGBOOK_POSTGRES_PASSWORD', 'password')
POSTGRES_HOST = os.environ.get('SONGBOOK_POSTGRES_HOST', 'localhost')
POSTGRES_PORT = os.environ.get('SONGBOOK_POSTGRES_PORT', '5432')
POSTGRES_DB = os.environ.get('SONGBOOK_POSTGRES_DB', 'postgres')

