import os

# SECURITY
API_KEY = os.environ.get('SONGBOOKIT_API_KEY', 'SUPERSECRETKEY')

# POSTGRES SETTINGS
POSTGRES_USER = os.environ.get('POSTGRES_USER', 'songbookit')
POSTGRES_PASSWORD = os.environ.get('POSTGRES_PASSWORD', 'password')
POSTGRES_HOST = os.environ.get('POSTGRES_HOST', 'localhost')
POSTGRES_PORT = os.environ.get('POSTGRES_PORT', '5432')
POSTGRES_DB = os.environ.get('POSTGRES_DB', 'postgres')