import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket, disconnectSocket, socket } from '../services/socket';
import { socketConnected, socketDisconnected } from '../redux/slices/socketSlice';

const Chat = ({ room, user }) => {
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.socket.connected);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    connectSocket();

    socket.emit('joinRoom', { room, user });

    socket.on('connect', () => {
      dispatch(socketConnected());
    });

    socket.on('disconnect', () => {
      dispatch(socketDisconnected());
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leaveRoom', { room, user });
      socket.off('message');
      disconnectSocket();
    };
  }, [room, user, dispatch]);

  const sendMessage = () => {
    if (connected && inputMessage.trim()) {
      socket.emit('chatMessage', { room, message: inputMessage, user });
      setInputMessage('');
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.user}</strong>: {msg.message} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
