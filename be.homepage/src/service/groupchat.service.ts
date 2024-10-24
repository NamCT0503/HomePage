// Tất cả thao tác chỉ được thực hiện với nhóm chat của tài khoản đăng nhập.

import { Op } from "sequelize";
import db from "../models";
import { GroupChatEntiy } from "../entities/app.entity";
import Account from "../models/Account";

export const getAllGroupChat = async (payload: any, isLeader?: boolean) => {
    try {
        if(!payload.sub) return{ status: 400, message: 'NotFound Account!'};

        let result: any;
        if(isLeader){
            result = await db.GroupChat.findAll({
                where: { leader: payload.sub},
                order: [
                    ['updatedAt', 'DESC'],
                    ['id', 'DESC']
                ]
            });
        } else {
            const condition_1 = `${payload.sub},%`;
            const condition_2 = `%, ${payload.sub},%`;
            const condition_3 = `%, ${payload.sub}`;
            const searchConditions = {
                [Op.or]: [
                    { member: { [Op.like]: condition_1 } },
                    { member: { [Op.like]: condition_2 } },
                    { member: { [Op.like]: condition_3 } }
                ]
            };

            result = await db.GroupChat.findAll({
                where: searchConditions
            });
        }

        return result;
    } catch (error) {
        console.error('=== In getAllGroupChat: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const getGroupChatById = async (sub: number, id: string) => {
    try {
        if(!sub || !id) return{ status: 400, message: 'ParamInput Invalid!'};

        const result = await db.GroupChat.findOne({
            attributes: ['id', 'name', 'avatar', 'leader', 'member'],
            include: [
                {
                    model: Account,
                    as: 'accounts',
                    attributes: ['fullname', 'username', 'avatar', 'role']
                }
            ],
            order: [
                ['updatedAt', 'DESC'],
                ['name', 'ASC']
            ],
            where: {
                leader: sub,
                id: id
            }
        });
        return result;
    } catch (error) {
        console.error('=== In getGroupChatById: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const createGroupChat = async (payload: any, data: GroupChatEntiy) => {
    try {
        if(!payload) return{ status: 400, message: 'NotFoun Account!'};

        const leaderGC = await getAllGroupChat(payload.sub, true);

        let idNewRecord = 1, arrIdExisted: any[];
        if(leaderGC){
            (leaderGC as GroupChatEntiy[]).map(items => {
                let id = parseInt(items.id.split(`${payload.username}`)[1]);
                // arrIdExisted.push(parseInt(id));
                idNewRecord = idNewRecord<=id? id+=1: idNewRecord;
            });
        }
    // console.log((req.body.member.split('[')[1].split(']')[0].split(',') as any[]).map(items => parseInt(items)))

        const formatNewGC: GroupChatEntiy = {
            id: `${payload.username}${idNewRecord}`,
            name: data.name,
            avatar: data.avatar,
            leader: payload.sub,
            member: data.member
        }
        await db.GroupChat.create(formatNewGC);

        return{ status: 200, message: 'Created Successfully!'};
    } catch (error) {
        console.error('=== In createGroupChat: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const upateGroupChat = async (data: Partial<GroupChatEntiy>, isUpate: boolean) => {
    try {
        if(!data || !data.id) return{ status: 400, message: 'DataInput Invalid!'};

        const gcExisted = await db.GroupChat.findByPk(data.id);
        if(!gcExisted) return{ status: 400, message: 'NotFound Record Match!'};

        const formatNewGC: Partial<GroupChatEntiy> = {
            name: data.name? data.name: gcExisted.name,
            avatar: data.avatar? data.avatar: gcExisted.avatar,
            member: data.member? changeMember(gcExisted?.member, data.member, isUpate): gcExisted.member
        }
        await db.GroupChat.upate()
    } catch (error) {
        console.error('=== In createGroupChat: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteGroupChat = async (id: string) => {
    try {
        if(!id || id===':id' || id==='id')
            return{ status: 400, message: 'ParamInput Invalid!'};

        await db.GroupChat.destroy({
            where: { id: id}
        });

        return{ status: 200, message: 'Deleted Successfully!'};
    } catch (error) {
        console.error('=== In updateGroupChat: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

const changeMember = (oldMenber: string, newMember: string, isUpate: boolean) => {
    let result: string;
    if(isUpate){
        result = oldMenber.replace(']', newMember.split('[')[1]);
    } else {
        if(oldMenber.startsWith(newMember.split(']')[0])){
            result = oldMenber.replace(newMember+', ', '[');
        } else if(oldMenber.endsWith(newMember.split('[')[1])){
            result = oldMenber.replace(', '+newMember+']', ']');
        } else {
            result = oldMenber.replace(', '+newMember, '');
        }
    }

    return result;
}