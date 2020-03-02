from channels import include

channel_routes = [
    include("backend.apps.chat.routing", path=r"^/chat"),
]
