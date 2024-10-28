// import { UserStatusEntity } from "../ws.server";

// export const broadcastUserStatus = (userId: number, userOnline: Map<number, UserStatusEntity>) => {
//     const userList = Array.from(userOnline.values()).map(users => ({
//         id: users.id,
//         status: users.status,
//         fullname: users.fullname,
//         username: users.username,
//         avatar: users.avatar,
//         role: users.role,
//         lastMessage: users.lastMessage,
//         sentAt: users.sentAt,
//         sender: users.sender,
//         revicer: users.revicer,
//         statusMessage: users.statusMessage,
//         lastOnline: users.lastOnline
//     }));

//     userOnline.forEach((users) => {
//         // const infoAcc = await getAccount(':param', users.id);
//         return users.socket.send(JSON.stringify({
//             type: 'user-status',
//             users: userList
//         }))
//     })
// }