from channels import include

channel_routes = [
    include("backend.apps.chat.routing.app_routes", path=r"^/chat/"),
]
