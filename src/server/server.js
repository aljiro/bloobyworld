
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const {Server} = require('socket.io');
const Simulation = require('./simulation.js');

const app = express();
const config = require('../../webpack.config.js');
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);


const sim = new Simulation(600, 600);

const server = app.listen(3000, function () {
  console.log('Blooby server listening on port 3000!\n');
});

const io = new Server(server);
const dashio = io.of('/dash');

let simSocket = null;
let dashSocket = null;

io.on('connection', (socket) => {
  console.log('Simulation client connected', socket.id);
  simSocket = socket;
});

dashio.on('connection', (socket) => {
  console.log('Dashboard client connected', socket.id);
  dashSocket = socket;
  socket.on("addFood", addFood);
});

function addFood(val){
  sim.addFood();
}

setInterval(function(){
  sim.update();

  if( simSocket != null ){
    simSocket.emit("stateUpdate", sim.serialize() );
  }
  if( dashSocket != null ){
    dashSocket.emit("energyUpdate", sim.agent.energy );
  }
 }, 100);