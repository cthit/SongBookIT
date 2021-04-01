import os

# SECURITY
INIT_DATA_PATH = os.environ.get('INIT_DATA_PATH', 'setup/md/')  # the path differs between the IDE and docker
RESOURCE_DATA_PATH = os.environ.get('RESOURCE_DATA_PATH', 'resources/')  # the path differs between the IDE and docker
