import { Op } from "sequelize";
import db from "../models";
import Viewer from "../models/Viewer";
import { deleteViewerById } from "./viewer.services";
import { ChatEntity } from "../entities/app.entity";
import Chat from "../models/Chat";
import Account from "../models/Account";
import { parseIntMember } from "./groupchat.service";

export const getAllChatInGC = async (sinceday?: number, sender?: number, revicer?: number, grchatid?: string) => {
    try {
        sinceday = (sinceday && !Number.isNaN(sinceday))? sinceday: 1;
        let result: any;
        if(grchatid && grchatid!=='' && grchatid!==':grchatid'){
            //Lấy tất cả tin nhắn trong group chat (Lấy 3 ngày một)
            const checkGCExisted = await db.Chat.findAll({
                order: [['createdAt', 'DESC']],
                where: { grchatid: grchatid}
            });
            const lastDateMessage = checkGCExisted[0]?.createdAt;
            const startDate = new Date(lastDateMessage);
            const endDate = startDate.setDate(startDate.getDate() - 3 * sinceday);

            result = await db.Chat.findAndCountAll({
                attributes: ['id', 'grchatid', 'sender', 'message', 'status', 'updatedAt'],
                include: [
                    {
                        model: Viewer,
                        as: 'viewers',
                        attributes: ['viewby', 'createdAt']
                    }
                ],
                order: [['updatedAt', 'DESC']],
                where: { 
                    grchatid: grchatid,
                    createdAt: { [Op.between]: [endDate, startDate]}
                }
            });
        } else if(
            (sender && !Number.isNaN(sender)) &&
            (revicer && !Number.isNaN(revicer))
        ) {
            //Lấy tất cả tin nhắn trong cuộc trò chuyện 1:1 (Lấy 3 ngày một)
            const chekcMessExisted = await db.Chat.findAll({
                order: [['createdAt', 'DESC']],
                where: { grchatid: grchatid}
            });
            const lastDateMessage = chekcMessExisted[0]?.createdAt;
            const startDate = new Date(lastDateMessage);
            const endDate = startDate.setDate(startDate.getDate() - 3 * sinceday)

            result = await db.Chat.findAll({
                attributes: ['id', 'sender', 'revicer', 'message', 'status', 'createdAt'],
                include: [
                    {
                        model: Viewer,
                        as: 'viewers',
                        attributes: ['createdAt']
                    }
                ],
                order: [['createdAt', 'DESC']],
                where: {
                    sender: sender,
                    revicer: revicer,
                    createdAt: { [Op.between]: [endDate, startDate]}
                }
            });
        } else return{ status: 400, message: "ParamInput Invalid!"};

        return result;
    } catch (error) {
        console.error('=== In getAllChatInGC: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const getChatOneToOne = async(sub: number, to: number) => {
    try {
        if((!to || Number.isNaN(to))) return{ status: 400, message: 'ParamInput Invalid!'};

        const result = await db.Chat.findAll({
            where: {
                grchatid: null,
                [Op.or]: [{
                    [Op.and]: [
                        { sender: sub},
                        { revicer: to}
                    ]
                }, {[Op.and]: [
                    { sender: to},
                    { revicer: sub}
                ]}]
            }
        });

        return result;
    } catch (error) {
        console.error('=== In getAllChatInGC: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const getAllChatBySub = async (sub: number) => {
    try {
        const result = await db.Chat.findAll({
            order: [['createdAt', 'ASC']],
            where: {
                grchatid: null,
                [Op.or]: [
                    { sender: sub},
                    { revicer: sub}
                ]
            }
        });

        return result;
    } catch (error) {
        console.error('=== In getAllChatBySub: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const getChatById = async(idchat: number, sub: number) => {
    try {
        if((!idchat || Number.isNaN(idchat)) || !sub)
            return{ status: 400, message: "ParamInput Invalid!"};

        const checkRoleChat = await db.Chat.findOne({
            where: { id: idchat}
        });

        if(checkRoleChat?.revicer!==null){
            return await db.Chat.findByPk(idchat);
        } else {
            const result = await db.GroupChat.findOne({
                attributes: [],
                include: [{
                    model: Chat,
                    as: 'chats',
                    attributes: ['id', 'grchatid', 'sender', 'message'],
                    include: [{
                        model: Viewer,
                        as: 'viewers',
                        attributes: ['viewby', 'createdAt'],
                        include: [{
                            model: Account,
                            as: 'accounts',
                            attributes: ['fullname', 'username', 'avatar', 'role']
                        }]
                    }]
                }],
                where: { id: checkRoleChat?.grchatid}
            });

            return result;
        }
    } catch (error) {
        console.error('=== In getChatById: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const checkRoleChat = async (idchat: number, sub: number) => {
    try {
        const chatExisted = await db.Chat.findByPk(idchat);
        if(!chatExisted) return{ status: 400, message: 'NotFound Message!'};

        if(chatExisted.grchatid){
            const result = await db.GroupChat.findOne({
                attributes: ['member'],
                where: { id: chatExisted.grchatid}
            })
            if(!result) return false;

            const arrMember = parseIntMember(result.member);
            if(!arrMember.includes(sub)) return false;

            return true;   
        } else {
            const result = await db.Chat.findOne({ where: {
                id: idchat,
                [Op.or]: [
                    { sender: sub},
                    { revicer: sub}
                ]
            }});
            if(!result) return false;
            
            return true;
        }
    } catch (error) {
        console.error('=== In checkRoleChat: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const statusChatToSeen = async (
    idchat: number, 
    status: 'sending' | 'sent' | 'reviced' | 'seen', 
    isWS: boolean,
    sub?: number,
) => {
    try {
        const chatExisted = await db.Chat.findByPk(idchat);
        if(!chatExisted) return{ status: 400, message: 'NotFound Chat!'};
        if(!status) return{ status: 400, message: 'Status Message Invalid!'};

        if(!isWS){
            const checkRole = await checkRoleChat(idchat, sub!);
            if(checkRole!==true) return{ status: 400, message: 'Account Enough Rights!'};
        }

        await db.Chat.update(
            { status: status}, { where: { id: idchat}}
        );

        return true;
    } catch (error) {
        console.error('=== In statusChatToSeen: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

//Chỉ được phép xóa tin nhắn của mình gửi
export const deleteChat = async (id: number|string, sub: number, isMessage: boolean) => {
    try {
        if(isMessage && typeof id==='number'){
            const checkRoleChat = await db.Chat.findOne({
                where: {
                    id: id,
                    sender: sub
                }
            });
            if(!checkRoleChat) return{ status: 400, message: 'Account Enough Rights!'};
            
            await deleteViewerById(id)

            await db.Chat.destroy({
                where: { id: id}
            })
        } else {
            if(typeof id === 'number'){
                //Đối với tin nhắn 1:1
                const checkRoleChat = await db.Chat.findOne({
                    where: {
                        id: id,
                        [Op.or]: [
                            { sender: sub},
                            { revicer: sub}
                        ]
                    }
                });
                if(!checkRoleChat) return{ status: 400, message: 'Account Enough Rights!'};

                const user1 = checkRoleChat?.sender;
                const user2 = checkRoleChat?.revicer;
                
                await db.Chat.findAll({ where: {
                    [Op.or]: [
                        {[Op.and]: [
                                { sender: user1},
                                { revicer: user2}
                        ]},
                        {[Op.and]: [
                            { sender: user2},
                            { revicer: user1}
                        ]}
                    ]
                }});
            } else {
                const allChatInGC = await db.Chat.findAll({
                    where: { grchatid: id}
                });

                allChatInGC?.map( async(items: any) => {
                    await deleteViewerById(items.id);
                    await db.Chat.destroy({
                        where: { id: items.id}
                    });
                });
            }
        }

        return{ status: 200, message: 'Deleted Successfully!'};
    } catch (error) {
        console.error('=== In deleteChat: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}