import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Backend URL

const socket = io(SOCKET_URL, {
  autoConnect: false
});

const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export { socket, connectSocket, disconnectSocket };
