import { Op } from "sequelize";
import db from "../models";
import Chat from "../models/Chat";
import Viewer from "../models/Viewer";
import { ViewerEntity } from "../entities/app.entity";
import { getTimeLocal } from "./blog.services";
import Account from "../models/Account";

//Chỉ dành cho group chat
export const createViewer = async(idchat: number, sub: number) => {
    try {
        if(!idchat) return{ status: 400, message: 'DataInput Invalid!'};

        const formatNewViewer: ViewerEntity = {
            idchat:idchat,
            viewby: sub
        }
        await db.Viewer.create(formatNewViewer);

        // const grchatidExisted = await db.Viewer.findOne({
        //     where: { idchat: grchatid}
        // });

        // if(grchatidExisted){
        //     const arrSeen = JSON.parse(grchatidExisted.viewby);
        //     const convertJson = await db.Account.findOne({
        //         attributes: ['id', 'username', 'avatar'],
        //         where: { id: sub}
        //     })
        //     arrSeen.accounts.push(convertJson)

        //     const formatViewer: ViewerEntity = {
        //         idchat: grchatid,
        //         viewby: JSON.stringify(arrSeen),
        //     }
        //     await db.Viewer.update(formatViewer, {
        //         where: { id: grchatidExisted.id}
        //     })
        // } else {
        //     const formatViewer: ViewerEntity = {
        //         idchat: grchatid,
        //         viewby: JSON.stringify({
        //             accounts: [await db.Account.findOne({
        //                 attributes: ['id', 'username', 'avatar'],
        //                 where: { id: sub}
        //             })]
        //         })
        //     }
        //     await db.Viewer.create(formatViewer);
        // }
    } catch (error) {
        console.error('=== In createViewer: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

// export const deleteViewerById = async(isMessage: boolean, id?: number|string, sub?: number, chatPersonId?: number) => {

export const deleteViewerById = async(id: number) => {
    try {
        await db.Viewer.destroy({
            where: { idchat: id}
        });
        // if(isMessage){
        //     await db.Viewer.destroy({
        //         where: { id: id}
        //     });
        // } else {
        //     //Đối với group chat
        //     if(typeof(id)==='string'){
        //         const arrIdChat = await db.Chat.findAll({
        //             attibutes: ['id'],
        //             where: { grchatid: id}
        //         });

        //         arrIdChat?.map(async (items: any) => {
        //             await db.Viewer.destroy({
        //                 where: { idchat: items}
        //             });
        //         });
        //     }

        //     //Đối với chat 1:1
        //     if(typeof(id)==='number'){
        //         const arrIdChat = await db.Chat.findAll({
        //             attributes: ['id'],
        //             where: {
        //                 [Op.or]: [
        //                     {[Op.and]: [
        //                         { sender: sub},
        //                         { revicer: chatPersonId},
        //                     ]},
        //                     {[Op.and]: [
        //                         { sender: chatPersonId},
        //                         { revicer: sub},
        //                     ]}
        //                 ]
        //             }
        //         });

        //         arrIdChat?.map( async(items: any) => {
        //             await db.Viewer.destroy({
        //                 where: { idchat: items}
        //             })
        //         });
        //     }
        // }
    } catch (error) {
        console.error('=== In deleteViewerById: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}