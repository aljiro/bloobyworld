import * as p5 from 'p5';
import io from 'socket.io-client';

const socket = io(`ws://${window.location.host}/`,  { reconnection: false });

const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = () => (
  connectedPromise.then(() => {
    // Register callbacks
      socket.on("stateUpdate", processStateUpdate);
  })
);

let state = {agent:{x: 0.0, y:0.0, energy:255}, food: []}

let s = (sk) => {
  sk.setup = () =>{
    sk.createCanvas(600, 600);
    connect();
  }

  sk.draw = () =>{
    sk.background(255);

    sk.fill(255 - state.agent.energy);
    sk.ellipse(state.agent.x, state.agent.y, 10, 10);
    sk.fill(255,0,0);
    state.food.forEach( food => sk.ellipse(food.x, food.y, 10, 10) );
  }
};

const processing = new p5(s);

function processStateUpdate( update ){
  state = update;
}