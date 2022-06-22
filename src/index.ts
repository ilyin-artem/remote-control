// import Jimp from 'jimp';
import { httpServer } from './http_server/index.js';
import robot from 'robotjs';
import WebSocket, { WebSocketServer } from 'ws';
import * as mouse from './modules/mouseActions.js';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });
let timerMouse;

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
        const [action, command, arg1, arg2] = splitMessage(data);

        clearInterval(timerMouse);
        switch (true) {
            case action === 'draw':
                break;
            case action === 'mouse':
                if (command === 'up') mouse.up(arg1);
                if (command === 'down') mouse.down(arg1);
                if (command === 'left') mouse.left(arg1);
                if (command === 'right') mouse.right(arg1);

                ws.send(`mouse_${command}`);

                break;

            default:
                break;
        }
    });

    ws.send('something');
});

// Move the mouse across the screen as a sine wave.

// Speed up the mouse.
const mouseMove = () => {
    let mouse = robot.getMousePos();

    robot.setMouseDelay(1);

    var twoPI = Math.PI * 2.0;
    var screenSize = robot.getScreenSize();
    // var height = screenSize.height / 2 - 10;
    // var width = screenSize.width;
    let height = 100;
    let width = 100;
    let y = 0;
    for (var x = 0; x < width; x++) {
        robot.moveMouse(x, y);
    }
};

const splitMessage = (data) => {
    const messageArr = data.toString().split(' ');
    const [action, command] = messageArr[0].split('_');
    const [arg1, arg2] = [Number(messageArr[1]), Number(messageArr[2])];
    return [action, command, arg1, arg2];
};
