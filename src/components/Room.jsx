import React, { useState } from 'react';
import Chat from './Chat';

const Room = () => {
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (user && room) {
      setJoined(true);
    }
  };

  return (
    <div>
      {!joined ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            <option value="">Select Room</option>
            <option value="Room 1">Room 1</option>
            <option value="Room 2">Room 2</option>
            <option value="Room 3">Room 3</option>
            <option value="Room 4">Room 4</option>
          </select>
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <Chat room={room} user={user} />
      )}
    </div>
  );
};

export default Room;
