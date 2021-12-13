import io from 'socket.io-client';

const socket = io(`ws://${window.location.host}/`,  { reconnection: false });

const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = onStart => (
    connectedPromise.then(() => {
      // Register callbacks
        socket.on("addFood", processAddFood);
    })
  );