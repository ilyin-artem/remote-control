import { httpServer } from './http_server/index.js';
import * as stream from 'stream';
import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';
import * as mouse from './modules/mouseActions.js';
import * as draw from './modules/drawActions.js';
import { captureScreen } from './modules/captureScreen.js';
import { splitMessage } from './modules/helpers.js';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws: WebSocket.WebSocket) {
    const duplex: stream.Duplex = createWebSocketStream(ws, {
        encoding: 'utf8',
        decodeStrings: false,
    });

    duplex.on('data', async (chunk: Buffer) => {
        console.log('received: %s', chunk);

        const [action, command, arg1, arg2] = splitMessage(chunk);

        switch (true) {
            case action === 'draw':
                if (command === 'circle') draw.circle(arg1);
                if (command === 'square') draw.rectangle(arg1);
                if (command === 'rectangle') draw.rectangle(arg1, arg2);
                break;
            case action === 'mouse':
                if (command === 'position') {
                    duplex.write(mouse.position());
                    break;
                }
                if (command === 'up') mouse.up(arg1);
                if (command === 'down') mouse.down(arg1);
                if (command === 'left') mouse.left(arg1);
                if (command === 'right') mouse.right(arg1);
                duplex.write(`mouse_${command}`);
                break;
            case action === 'prnt' && command === 'scrn':
                const buffer = await captureScreen();
                duplex.write(`${buffer}`);
                break;

            default:
                break;
        }
    });
});

wss.on('close', () => {
    console.log('WebSocket closed');
});
