// Tất cả thao tác chỉ được thực hiện với nhóm chat của tài khoản đăng nhập.

import { Op } from "sequelize";
import db from "../models";
import { GroupChatEntiy } from "../entities/app.entity";
import Account from "../models/Account";
import { deleteViewerById } from "./viewer.services";
import { deleteChat } from "./chat.services";

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

        const findGCId = await db.GroupChat.findByPk(id);
        if(!findGCId) return{ status: 400, message: 'NotFound Group Chat Match!'};

        let result: any;
        const arrMemberInt = parseIntMember(findGCId?.member);
        if(arrMemberInt.includes(sub)){
            result = await db.GroupChat.findOne({
                attributes: ['id', 'name', 'avatar', 'leader', 'member'],
                include: [
                    {
                        model: Account,
                        as: 'accounts',
                        attributes: ['username', 'avatar', 'role']
                    }
                ],
                order: [
                    ['updatedAt', 'DESC'],
                    ['name', 'ASC']
                ],
                where: { id: id}
            });

            result.member = await getInfoMember(result.member);
        } else {
            result = { status: 400, message: 'Can\'t get info group chat by your account!'};
        }
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
        if(
            (!data) ||
            (!data.member || data.member==='[]') ||
            (!data.name || data.name==='')
        ) return{ status: 400, message: 'DataInput Invalid!'};

        //Cho phép người dùng nhập id hoặc không
        let idNewRecord = 1, arrIdExisted: any[];
        if(!data.id || data.id===''){
            const leaderGC = await getAllGroupChat(payload, true);
            if(leaderGC?.status) return leaderGC;
            
            (leaderGC as GroupChatEntiy[]).map(items => {
                let id = parseInt(items.id.split(`${payload.username}`)[1]);
                // arrIdExisted.push(parseInt(id));
                idNewRecord = idNewRecord<=id? id+=1: idNewRecord;
            });
        } else {
            const checkUniqueId = await db.GroupChat.findByPk(data.id)
            if(checkUniqueId) return{ status: 400, message: 'ID Existed!'};
        }

        //Kiểm tra xem các thành viên có tồn tại không
        const memberInput = parseIntMember(data.member);
        const allAccount = await db.Account.findAll({
            attributes: ['id']
        });
        let arrId: number[] = [];
        allAccount?.map((items: any) => arrId.push(items.id))
        const memberDiffirent = memberInput.filter(items => !arrId.includes(items));
        if(memberDiffirent.length!==0) return{ status: 400, message: `List id member input invalid: `+memberDiffirent}

        const formatNewGC: GroupChatEntiy = {
            id: (data.id && data.id!=='')? data.id: `${payload.username}${idNewRecord}`,
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

export const updateGroupChat = async (data: Partial<GroupChatEntiy>, isUpate: boolean) => {
    try {
        if(!data || !data.id) return{ status: 400, message: 'DataInput Invalid!'};

        const gcExisted = await db.GroupChat.findByPk(data.id);
        if(!gcExisted) return{ status: 400, message: 'NotFound Record Match!'};

        const formatNewGC: Partial<GroupChatEntiy> = {
            name: data.name? data.name: gcExisted.name,
            avatar: data.avatar? (data.avatar as any)?.filename: gcExisted.avatar,
            member: data.member? changeMember(gcExisted?.member, data.member, isUpate): gcExisted.member
        }

        await db.GroupChat.update(formatNewGC, {
            where: { id: gcExisted.id}
        });
        return{ status: 200, message: "Updated Successfully!"};
    } catch (error) {
        console.error('=== In upateGroupChat: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteGroupChat = async (id: string, sub: number) => {
    try {
        if(!id || id===':id' || id==='id')
            return{ status: 400, message: 'ParamInput Invalid!'};

        const checkLeaderGC = await db.GroupChat.findOne({
            where: {
                id: id,
                leader: sub
            }
        });
        if(!checkLeaderGC) return{ status: 400, message: 'Account Enought Rights!'};

        await deleteChat(id, sub, false);

        await db.GroupChat.destroy({
            where: { id: id}
        });

        return{ status: 200, message: 'Deleted Successfully!'};
    } catch (error) {
        console.error('=== In deleteGroupChat: '+error);
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

const getInfoMember = async (member: string) => {
    try {
        const arrMemberInt = parseIntMember(member);

        let arrInfoMember: any[] = [];
        const allId = arrMemberInt.map(async (items) => {
            const query = await db.Account.findAll({
                attributes: ['id', 'fullname', 'username', 'avatar', 'role'],
                where: { id: items}
            });
            return query;
            // arrInfoMember.push(await query);
        });
        arrInfoMember = await Promise.all(allId);
        return arrInfoMember;
    } catch (error) {
        console.error('=== In getInfoMember: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const parseIntMember = (member: string) => {
    const result = (member.split('[')[1].split(']')[0].split(',') as any[]).map(items => parseInt(items));
    return result;
}