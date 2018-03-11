import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import uuidv4 from 'uuid/v4';

import checkEnv from './checkEnv';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

const getFirstSocket = (room) => {
  const id = Object.keys(io.sockets.adapter.rooms[room].sockets)[0];
  return io.sockets.connected[id];
}

io.on('connection', (socket) => {
  socket.on('join-matchmaking', () => {
    socket.join('waitlist');
    const numberOfConnections = io.sockets.adapter.rooms.waitlist.length;
    if (numberOfConnections >= 2) {
      const roomID = uuidv4();
      socket.leave('waitlist');
      socket.join(roomID);

      const partner = getFirstSocket('waitlist');
      partner.leave('waitlist');
      partner.join(roomID);

      socket.emit('game-found', roomID);
      partner.emit('game-found', roomID);
    } else {
      socket.emit('waitlist-empty');
    }
  });
  socket.on('angle', (data) => {
    io.in(data.roomID).emit('angle', data.angle);
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Magic is happening on port ${port}!`); // eslint-disable-line
});
