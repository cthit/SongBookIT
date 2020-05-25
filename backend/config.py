import os

# SECURITY
API_KEY = os.environ.get('SONGBOOKIT_API_KEY', 'SUPERSECRETKEY')

# POSTGRES SETTINGS
POSTGRES_USER = os.environ.get('SONGBOOKIT_POSTGRES_USER', 'songbookit')
POSTGRES_PASSWORD = os.environ.get('SONGBOOKIT_POSTGRES_PASSWORD', 'password')
POSTGRES_HOST = os.environ.get('SONGBOOKIT_POSTGRES_HOST', 'localhost')
POSTGRES_PORT = os.environ.get('SONGBOOKIT_POSTGRES_PORT', '5432')
POSTGRES_DB = os.environ.get('SONGBOOKIT_POSTGRES_DB', 'postgres')

SECRET_KEY = os.environ.get('SONGBOOKIT_SECRET_KEY', 'secret')

GAMMA_CLIENT_ID = os.environ.get('GAMMA_CLIENT_ID', 'id')
GAMMA_SECRET = os.environ.get('GAMMA_SECRET', 'secret')
GAMMA_ME_URI = os.environ.get('GAMMA_ME_URI', 'http://gamma-backend:8081/api/users/me')
GAMMA_TOKEN_URI = os.environ.get('GAMMA_TOKEN_URI', 'http://gamma-backend:8081/api/oauth/token')
GAMMA_AUTHORIZATION_URI = os.environ.get('GAMMA_AUTHORIZATION_URI', 'http://localhost:8081/api/oauth/authorize')
GAMMA_REDIRECT_URI = os.environ.get('GAMMA_REDIRECT_URI', 'http://localhost:3001/auth/account/callback')
