import os


from channels.routing import get_default_application
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
# Initialize Django ASGI application early to ensure the AppRegistry

django.setup()

application = get_default_application()