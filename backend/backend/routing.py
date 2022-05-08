# mysite/routing.py
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter, ChannelNameRouter
import tasks.routing
from tasks.consumers import BackgroundTaskConsumer

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            tasks.routing.websocket_urlpatterns
        )
    ),
    
})
