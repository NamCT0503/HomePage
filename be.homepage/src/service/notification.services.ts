import { Op } from "sequelize";
import { NotiDetailEntity, NotificationEntity } from "../entities/app.entity";
import db from "../models";
import { createNotiDetail } from "./notidetail.services";
import NotiDetail from "../models/NotiDetail";
import Account from "../models/Account";

export const getNotiFollowAccont = async (sub: number) => {
    try {
        const result = await db.Notification.findAll({
            attributes: ['id', 'actionid', 'type_noti', 'status', 'actionBy', 'createdAt'],
            include: [
                {
                    model: NotiDetail,
                    as: 'notidetails',
                    attributes: ['seen', 'dataChange'],
                    include: [
                        {
                            model: Account,
                            as: 'accounts',
                            attributes: ['username', 'avatar', 'role']
                        }
                    ],
                    where: { accountid: sub}
                }
            ],
            order: [['id', 'DESC']],
            where: { actionBy: {[Op.ne]: sub}}
        })

        return result? result: { status: 200, message: 'Không có thông báo mới!'};
    } catch (error) {
        console.error('=== In getNotiFollowAccont: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const createNoti = async (data: NotificationEntity, dataChange?: any) => {
    try {
        if(!data) return{ status: 400, message: "DataInput Invalid!"};

        const addNoti = await db.Notification.create(data);

        const allAccount = await db.Account.findAll({
            where: { id: {[Op.ne]: data.actionid}}
        });

        // await allAccount.filter((items: any) => items.id !== data.actionBy)
        // .map(async (items: any) => {
        //     const formatData: NotiDetailEntity = {
        //         accountid: items.id,
        //         notiid: addNoti.id,
        //         seen: false,
        //         dataChange: dataChange? JSON.stringify(dataChange): 'Thay đổi không được hiển thị'
        //     }
        //     await createNotiDetail(formatData);
        // })

        return{ 
            status: 200, 
            message: "Created Successfully!"
        };
    } catch (error) {
        console.error('=== In createNoti: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}