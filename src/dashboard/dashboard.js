import io from 'socket.io-client';

let energy = 0;
const energyDiv = document.createElement('div');
const socket = io(`ws://${window.location.host}/dash`,  { reconnection: false });

const connectedPromise = new Promise(resolve => {
    socket.on('connect', () => {
        console.log('Connected to server!');
        resolve();
    });
});

const connect = () => (
connectedPromise.then(() => {
        // Register callbacks
        socket.on("energyUpdate", processEnergyUpdate);
    })
);

function processEnergyUpdate( update ){
    energyDiv.innerHTML = `<b>Energy:</b>${energy.toFixed(2)}<br />`;
    energy = update;
}

function feedBlooby(){
    socket.emit("addFood", 1);
}

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerHTML = 'Feed';    
    btn.onclick = feedBlooby;
    element.appendChild(energyDiv);
    element.appendChild(btn);

   return element;
 }

 document.body.appendChild(component());
 connect();