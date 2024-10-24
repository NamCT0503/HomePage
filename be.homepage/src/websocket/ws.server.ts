import WebSocket from 'ws';
import http from 'http';
import * as dotenv from "dotenv";

dotenv.config();

const WSServer = (app: any) => {
    const server = http.createServer(app);
    const ws = new WebSocket.Server({server});

    ws.on('connection', wss => {
        console.log('Connected!');

        wss.on('message', mess => {
            console.log('Reviced message: ', mess);

            ws.clients.forEach(clients => {
                if(clients.readyState === WebSocket.OPEN){
                    clients.send(mess);
                }
            });
        });

        wss.on('close', () => {
            console.log('Closed Connection!');
        })
    });

    server.listen(process.env.WS_PORT, () => {
        console.log(`WebSocket server is running on port ${process.env.WS_PORT}`);
    });
}

export default WSServer;