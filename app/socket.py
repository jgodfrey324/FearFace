# from flask_socketio import SocketIO, emit
# import os


# if os.environ.get("FLASK_ENV") == "production":
#     origins = [
#         "http://fearface.onrender.com",
#         "http://fearface.onrender.com"
#     ]
# else:
#     origins = "*"

# # create your SocketIO instance
# socketio = SocketIO()

# socketio = SocketIO(cors_allowed_origins=origins)


# @socketio.on("chat")
# def handle_chat(data):
#     emit("chat", data, broadcast=True)
