const Message = require('../models/Message');

module.exports = (io, socket) => {
  socket.on('joinRoom', ({ room, user }) => {
    socket.join(room);
    socket.broadcast.to(room).emit('message', {
      user: 'admin',
      message: `${user} has joined the room`,
      timestamp: new Date()
    });
  });

  socket.on('chatMessage', async ({ room, message, user }) => {
    const msg = new Message({ room, message, user });
    await msg.save();
    io.to(room).emit('message', { user, message, timestamp: new Date() });
  });

  socket.on('leaveRoom', ({ room, user }) => {
    socket.leave(room);
    socket.broadcast.to(room).emit('message', {
      user: 'admin',
      message: `${user} has left the room`,
      timestamp: new Date()
    });
  });
};
