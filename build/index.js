var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { httpServer } from './http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer, createWebSocketStream } from 'ws';
import * as mouse from './modules/mouseActions.js';
import * as draw from './modules/drawActions.js';
import { captureScreen } from './modules/captureScreen.js';
const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
const wss = new WebSocketServer({ port: 8080 });
let timerMouse;
wss.on('connection', function connection(ws) {
    const duplex = createWebSocketStream(ws, {
        encoding: 'utf8',
        decodeStrings: false,
    });
    duplex.on('data', (chunk) => __awaiter(this, void 0, void 0, function* () {
        console.log('received: %s', chunk);
        const [action, command, arg1, arg2] = splitMessage(chunk);
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
                    duplex.write(mouse.position());
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
                duplex.write(`mouse_${command}`);
                break;
            case action === 'prnt' && command === 'scrn':
                const buffer = yield captureScreen();
                duplex.write(`${buffer}`);
                break;
            default:
                break;
        }
    }));
});
const splitMessage = (data) => {
    const messageArr = data.toString().split(' ');
    const [action, command] = messageArr[0].split('_');
    const [arg1, arg2] = [Number(messageArr[1] - 1), Number(messageArr[2]) - 1];
    return [action, command, arg1, arg2];
};
