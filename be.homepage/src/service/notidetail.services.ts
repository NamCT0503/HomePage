import { NotiDetailEntity } from "../entities/app.entity";
import db from "../models";

export const createNotiDetail = async (data: NotiDetailEntity) => {
    try {
        if(!data) return{ status: 400, message: 'DataInput Invalid!'};

        await db.NotiDetail.create(data);
        return{ status: 200, message: "Created Sucessfully!"};
    } catch (error) {
        console.error('=== In createNotiDetail: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const updateFieldSeen = async (sub: number, notiid: number) => {
    try {
        if(!sub || typeof(sub) !== 'number')
            return{ status: 400, message: 'DataInput Invalid!'};

        await db.NotiDetail.update({seen: true}, {
            where: { 
                accountid: sub,
                notiid: notiid,
            }
        });
    } catch (error) {
        console.error('=== In updateFieldSeen: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}