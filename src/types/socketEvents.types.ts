export enum SocketEvents {
  createMsg = 'message:create',
  deleteMsg = 'message:delete',
  receiveMsg = 'message:receive',
  updateMsg = 'message:update',
  readMsg = 'message:read',

  userStartTyping = 'user:startTyping',
  userStopTyping = 'user:stopTyping',

  joinRoom = 'room:join',
  leaveRoom = 'room:leave',

  createDialog = 'dialog:create',
  deleteDialog = 'dialog:delete',

  disconnect = 'disconnect',
  connect = 'connect',
}
