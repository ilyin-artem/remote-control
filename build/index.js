import { httpServer } from './http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import * as mouse from './modules/mouseActions.js';
import * as draw from './modules/drawActions.js';
const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
const wss = new WebSocketServer({ port: 8080 });
let timerMouse;
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
        const [action, command, arg1, arg2] = splitMessage(data);
        const mousePoints = robot.getMousePos();
        clearInterval(timerMouse);
        switch (true) {
            case action === 'draw':
                if (command === 'circle')
                    draw.circle(arg1);
                if (command === 'square')
                    draw.rectangle(arg1);
                if (command === 'rectangle')
                    draw.rectangle(arg1, arg2);
                break;
            case action === 'mouse':
                if (command === 'position') {
                    ws.send(mouse.position());
                    break;
                }
                if (command === 'up')
                    mouse.up(arg1);
                if (command === 'down')
                    mouse.down(arg1);
                if (command === 'left')
                    mouse.left(arg1);
                if (command === 'right')
                    mouse.right(arg1);
                ws.send(`mouse_${command}`);
                break;
            default:
                break;
        }
    });
    ws.send('something');
});
const splitMessage = (data) => {
    const messageArr = data.toString().split(' ');
    const [action, command] = messageArr[0].split('_');
    const [arg1, arg2] = [Number(messageArr[1] - 1), Number(messageArr[2]) - 1];
    return [action, command, arg1, arg2];
};
