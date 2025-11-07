const { Server } = require('socket.io');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*', // set your frontend origin in production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 socket connected:', socket.id);

    socket.on('disconnect', (reason) => {
      console.log('🔌 socket disconnected:', socket.id, reason);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error(
      'Socket.io has not been initialized. Call initSocket(server) first.'
    );
  }
  return io;
}

// Helper function to emit to all Clients
function emitToAll(event, payload) {
  getIO().emit(event, payload);
}

module.exports = {
  initSocket,
  getIO,
  emitToAll,
};
