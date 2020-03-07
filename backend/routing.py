from channels import include
from backend.apps.chat.routing import chat_routes

app_routes = {
    'chat': chat_routes
}

channel_routes = [
    include(app_routes.values(), path=r"^/subscriptions/"),
]
