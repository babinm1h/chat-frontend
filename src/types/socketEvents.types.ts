export enum SocketEvents {
  createMsg = "message:create",
  deleteMsg = "message:delete",
  receiveMsg = "message:receive",

  connect = "connected",
  disconnect = "disconnect",

  userStartTyping = "user:startTyping",
  userStopTyping = "user:stopTyping",

  joinRoom = "room:join",
  leaveRoom = "room:leave",

  createDialog = "dialog:create",
  deleteDialog = "dialog:delete",
}
