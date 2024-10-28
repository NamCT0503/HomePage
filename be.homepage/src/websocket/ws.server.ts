import WebSocket from 'ws';
import http from 'http';
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import db from '../models';
import { ChatEntity } from '../entities/app.entity';
import { statusChatToSeen } from '../service/chat.services';
import { getAccount } from '../service/account.services';
import { Op } from 'sequelize';
// import { broadcastUserStatus } from './service/ws.service';

dotenv.config();

export interface UserStatusEntity {
    id: number;
    socket: WebSocket;
    fullname: string;
    username: string;
    avatar: string;
    role: string;
    lastMessage: string;
    sentAt: string | Date;
    sender: number;
    revicer: number;
    statusMessage: string;
    status: 'online' | 'offline';
    lastOnline: Date | null;
}

// interface LastestMessage {
//     id: number;
//     lastMessage: string;
//     sentAt: string | Date;
//     sender: number;
//     revicer: number;
//     statusMessage: string;
// }

const WSServer = (app: any) => {
    const server = http.createServer(app);
    const ws = new WebSocket.Server({server});
    const userOnline: Map<number, UserStatusEntity> = new Map();

    const broadcastUserStatus = (userId: number) => {
        const userList = Array.from(userOnline.values()).map(users => ({
            id: users.id,
            status: users.status,
            fullname: users.fullname,
            username: users.username,
            avatar: users.avatar,
            role: users.role,
            lastMessage: users.lastMessage,
            sentAt: users.sentAt,
            sender: users.sender,
            revicer: users.revicer,
            statusMessage: users.statusMessage,
            lastOnline: users.lastOnline
        }));
    
        userOnline.forEach((users) => {
            // const infoAcc = await getAccount(':param', users.id);
            return users.socket.send(JSON.stringify({
                type: 'user-status',
                users: userList
            }))
        })
    }

    const validateToken = (token: string) => {
        try {
            const verify = jwt.verify(token, process.env.JWT_SECRET as string);
            return verify;
        } catch (error) {
            console.log('[WebSocket --- In validateToken]: Disconnected because token invalid!', error);
            return null;
        }
    }

    ws.on('connection', async (wss, req) => {
        console.log('New Connected!');

        //Xác nhận người dùng thông qua token
        const urlParams = new URLSearchParams(req.url?.split('?')[1]);
        const beaererToken = urlParams.get('token');
        if(!beaererToken){
            console.log('[WebSocket --- In onconnection]: Disconnected because token invalid!');
            wss.close();
            return;
        }
        const authToken = validateToken(beaererToken);
        if(!authToken){
            wss.close()
            return authToken;
        }

        //Tìm kiếm thông tin người dùng
        const userId = (authToken as any).sub;
        console.log('sub: ', userId, typeof userId);
        const infoAcc = await getAccount(':param', userId);
        let newUser: UserStatusEntity = {
            id: userId,
            socket: wss,
            fullname: infoAcc.fullname,
            username: infoAcc.username,
            avatar: infoAcc.avatar,
            role: infoAcc.role,
            lastMessage: '',
            sentAt: '',
            sender: userId,
            revicer: 0,
            statusMessage: 'reiviced',
            status: 'online',
            lastOnline: null
        }
        userOnline.set(userId, newUser);
        // broadcastUserStatus(userId, 'user-status');
        broadcastUserStatus(userId);
        // console.log('arrU: ', Array.from(userOnline.values()))
        for(let i=0; i<userOnline.size; i++){
            const uitems = Array.from(userOnline.values())[i]
            if(uitems.id!=userId){
                const findlastestMess = await db.Chat.findAll({
                    order: [['createdAt', 'DESC']],
                    where: { 
                        grchatid: null,
                        [Op.or]: [
                            {
                                [Op.and]: [
                                    { sender: userId},
                                    { revicer: uitems.id}
                                ]
                            }, 
                            {
                                [Op.and]: [
                                    { sender: uitems.id},
                                    { revicer: userId}
                                ]
                            }
                        ]
                    }
                });
                // console.log('findlastestMess: ', findlastestMess[0])
                newUser = { 
                    id: userId, 
                    socket: wss,
                    fullname: infoAcc.fullname,
                    username: infoAcc.username,
                    avatar: infoAcc.avatar,
                    role: infoAcc.role,
                    lastMessage: findlastestMess[0]?.message,
                    sentAt: findlastestMess[0]?.createdAt,
                    sender: findlastestMess[0]?.sender,
                    revicer: findlastestMess[0]?.revicer,
                    status: 'online',
                    statusMessage: findlastestMess[0]?.status,
                    lastOnline: null
                }
                console.log('for')
                userOnline.set(userId, newUser);
                // broadcastUserStatus(userId, 'user-status');
                broadcastUserStatus(userId);
            }
        }
        console.log(`User ${userId} Connected!`);

        wss.on('message', async(mess) => {
            const message = JSON.parse(mess.toString());
            const revicer = userOnline.get(message.revicer);
            const sender = userOnline.get(userId);
            sender?.socket.send(JSON.stringify({
                message: message.message,
                status: 'sending'
            }))
            if(revicer){
                const saveMessChat: ChatEntity = {
                    sender: userId,
                    revicer: revicer?.id,
                    message: message.message,
                    status: 'sent'
                }
                const newMessage = await db.Chat.create(saveMessChat);
                revicer.socket.send(message.message);

                if(revicer.socket.readyState === WebSocket.OPEN){
                    await statusChatToSeen(newMessage?.id, 'reviced', true);
                    sender?.socket.send(JSON.stringify({
                        message: message.message,
                        status: 'reviced'
                    }))
                }
                sender?.socket.send(JSON.stringify({
                    message: message.message,
                    status: 'sent'
                }))
            }
            // ws.clients.forEach(clients => {
            //     if(clients.readyState === WebSocket.OPEN){
            //         clients.send(message.message);
            //     }
            // });
        });

        wss.on('close', () => {
            const user = userOnline.get(userId);
            if(user){
                user.status = 'offline';
                user.lastOnline = new Date();
                userOnline.set(userId, user);
                // broadcastUserStatus(userId, 'user-status');
                broadcastUserStatus(userId);
            }
            console.log(`User ${userId} Disconnected!`);
        })
    });

    server.listen(process.env.WS_PORT, () => {
        console.log(`WebSocket server is running on ws://localhost:${process.env.WS_PORT}`);
    });
}

export default WSServer;