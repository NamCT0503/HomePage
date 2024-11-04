import WebSocket from 'ws';
import http from 'http';
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import fs from "fs";
import db from '../models';
import { ChatEntity } from '../entities/app.entity';
import { statusChatToSeen } from '../service/chat.services';
import { getAccount } from '../service/account.services';
import { Op } from 'sequelize';
import path from 'path';
// import { broadcastUserStatus } from './service/ws.service';

dotenv.config();

export interface UserStatusEntity {
    id: number;
    idchat: number;
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

export const userOnline: Map<number, UserStatusEntity> = new Map();

export const broadcastUserStatus = (userId: number, type: string) => {
    const userList = Array.from(userOnline.values()).map(users => ({
        id: users.id,
        idchat: users.idchat,
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

    if(type==='last-mess' || type==='lm-status-response'){
        userOnline.forEach((users) => {
            if(users.id===userId){
                console.log(`Đã gửi trạng thái đến người dùng: ${users.id}`);
                // const infoAcc = await getAccount(':param', users.id);
                return users.socket.send(JSON.stringify({
                    type: type,
                    users: userList
                }))
            }
        })
    }
    if(type==='user-status') {
        userOnline.forEach((users) => {
            console.log(`Đã gửi trạng thái đến người dùng: ${users.id}`);
            // const infoAcc = await getAccount(':param', users.id);
            return users.socket.send(JSON.stringify({
                type: type,
                users: userList.filter(items => {
                    if(items.id!==users.id){
                        return{
                            id: items.id,
                            status: items.status,
                            fullname: items.fullname,
                            username: items.username,
                            avatar: items.avatar,
                            role: items.role,
                            lastOnline: items.lastOnline,
                            sentAt: items.sentAt
                        }
                    }
                })
            }))
        })
    }
}

const WSServer = (app: any) => {
    const server = http.createServer(app);
    const ws = new WebSocket.Server({server});
    // const userOnline: Map<number, UserStatusEntity> = new Map();

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
        // Array.from(userOnline.values()).map(items => {
        //     if(items.id==userId) return items.socket.close();
        // })
        const infoAcc = await getAccount(':param', userId);
        let newUser: UserStatusEntity = {
            id: userId,
            idchat: 0,
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
        if(userOnline.size<1){
            userOnline.set(userId, newUser);
            return broadcastUserStatus(userId, 'user-status');
        }

        //Cập nhật danh sách tin nhắn mới nhất của người dùng
        // console.log('arrU: ', Array.from(userOnline.values()))
        let arrChatWith: any[] = [];
        for(let i=0; i<userOnline.size; i++){
            // console.log('arr: ',Array.from(userOnline.values()).map(items => items.id))
            const uitems = Array.from(userOnline.values())[i];
            if(uitems.id!=userId){
                // console.log('uid: ', uitems.id);
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
                newUser = { 
                    id: userId, 
                    idchat: findlastestMess[0]?.id,
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
                // console.log(newUser)
                userOnline.set(userId, newUser);
                // console.log('uid: ', uitems.id);
                const userConnected = userOnline.get(uitems.id);
                if(userConnected){
                    userConnected.idchat = findlastestMess[0]?.id;
                    userConnected.lastMessage = findlastestMess[0]?.message;
                    userConnected.sentAt = findlastestMess[0]?.createdAt;
                    userConnected.sender = findlastestMess[0]?.sender;
                    userConnected.revicer = findlastestMess[0]?.revicer;
                    userConnected.statusMessage = findlastestMess[0]?.status;
                    userOnline.set(uitems.id, userConnected);
                }
                broadcastUserStatus(userId, 'last-mess');
            }
        }
        // broadcastUserStatus(userId);
        broadcastUserStatus(userId, 'user-status');
        console.log(`User ${userId} Connected!`);

        wss.on('message', async(mess) => {
            console.log('messConsole: ', mess)
            const message = JSON.parse(mess.toString());
            let messageFile: string, reviceId: number;
            console.log('message: ', message);

            if(message.type==='send-file'){
                console.log('fileConsole: ', message);
                const fileName = message.file.fileName;
                const dataFile = message.file.fileData;
                const matches = dataFile?.match(/^data:(.+);base64,(.+)$/);
                if(!matches) return console.error('[WS - Send File]: File Invalid!');

                const fileType = matches[1];
                const dataBase64 = matches[2];
                const bufferFile = Buffer.from(dataBase64, 'base64');

                const pathUpload = path.join(__dirname, '../../public/uploads');
                if(!fs.existsSync(pathUpload)) fs.mkdirSync(pathUpload, {recursive: true});
                const pathFile = path.join(pathUpload, fileName);
                fs.writeFileSync(pathFile, bufferFile);

                messageFile = JSON.stringify({file: fileName});
                reviceId = message.file.id;
                // const formatMess: ChatEntity = {
                //     grchatid: undefined,
                //     sender: userId,
                //     revicer: message.file.id,
                //     message: messageFile,
                //     status: 'sending'
                // }
                // await db.Chat.create(formatMess);
                // return;
            }

            const revicer = userOnline.get(message.revicer? message.revicer: reviceId!);
            const sender = userOnline.get(userId);
            sender?.socket.send(JSON.stringify({
                type: 'new-message',
                message: message.message? message.message: messageFile!,
                status: 'sending',
                revicer: revicer?.id,
                sender: sender.id
            }));
            const saveMessChat: ChatEntity = {
                sender: userId,
                revicer: revicer?.id,
                message: message.message? message.message: messageFile!,
                status: 'sent',
            }
            const newMessage = await db.Chat.create(saveMessChat);
            console.log('new Message: ', newMessage);

            if(revicer){
                revicer.socket.send(JSON.stringify({
                    type: 'new-message',
                    id: newMessage.id,
                    message: message.message? message.message: messageFile!,
                    sender: userId,
                    revicer: message.revicer? message.revicer: reviceId!
                }));

                //Làm mới tin nhắn gần nhất của cuộc trò chuyện 1:1
                const notiNewMessage_sender = userOnline.get(userId);
                const notiNewMessage_revicer = userOnline.get(message.revicer? message.revicer: reviceId!);
                if(notiNewMessage_revicer && notiNewMessage_sender){
                    // console.log('message console: ', message);
                    notiNewMessage_sender.idchat = notiNewMessage_revicer.idchat = newMessage.id;
                    notiNewMessage_sender.lastMessage = notiNewMessage_revicer.lastMessage = message.message;
                    notiNewMessage_sender.revicer = notiNewMessage_revicer.revicer = message.revicer;
                    notiNewMessage_sender.sender = notiNewMessage_revicer.sender = userId;
                    notiNewMessage_sender.sentAt = notiNewMessage_revicer.sentAt = new Date();
                    notiNewMessage_sender.statusMessage = notiNewMessage_revicer.statusMessage = newMessage.status;

                    broadcastUserStatus(userId, 'last-mess');
                    broadcastUserStatus(message.revicer? message.revicer: reviceId!, 'last-mess');
                }

                if(revicer.socket.readyState === WebSocket.OPEN){
                    await statusChatToSeen(newMessage?.id, 'reviced', true);
                    sender?.socket.send(JSON.stringify({
                        type: 'new-message',
                        message: message.message? message.message: messageFile!,
                        status: 'reviced',
                        revicer: revicer?.id,
                        sender: sender.id
                    }))
                } else {
                    sender?.socket.send(JSON.stringify({
                        type: 'new-message',
                        message: message.message? message.message: messageFile!,
                        status: 'sent',
                        revicer: revicer?.id,
                        sender: sender.id
                    }))
                }
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
                // broadcastUserStatus(userId);
                broadcastUserStatus(userId, 'user-status');
            }
            console.log(`User ${userId} Disconnected!`);
        })
    });

    server.listen(process.env.WS_PORT, () => {
        console.log(`WebSocket server is running on ws://localhost:${process.env.WS_PORT}`);
    });
}

export default WSServer;