import { ContentAppEntity, NotificationEntity } from "../entities/app.entity";
import db from "../models";
import ServiceApp from "../models/ServiceApp";
import { createNoti } from "./notification.services";

export const getContentApp = async (serappId: number, ref: string) => {
    try {
        let result: any, arrResult: any[] = [];

        if(serappId){
            if(serappId === 0) return{ status: 400, message: "DataInput Invalid!"};

            if(ref !== ':ref'){
                const query = await db.ContentApp.findAll({
                    attributes: ['id', 'serapp_id', 'icon', 'content'],
                    include: [{
                        model: ServiceApp,
                        as: 'serviceapps',
                        attributes: ['type', 'title', 'subtitle']
                    }],
                    where: { serapp_id: serappId}
                });
                
                query?.map((item: any) => {
                    arrResult.push({
                        id: item.id,
                        serapp_id: item.serapp_id,
                        icon: item.icon,
                        content: item.content,
                        type: item.serviceapps.type,
                        title: item.serviceapps.title,
                        subtitle: item.serviceapps.subtitle
                    })
                });
            } else {
                result = await db.ContentApp.findAll({
                    where: { serapp_id: serappId}
                });
            }
        } else {
            if(ref !== ':ref'){
                const query = await db.ContentApp.findAll({
                    attributes: ['id', 'serapp_id', 'icon', 'content'],
                    include: [{
                        model: ServiceApp,
                        as: 'serviceapps',
                        attributes: ['type', 'title', 'subtitle']
                    }]
                });

                query?.map((item: any) => {
                    arrResult.push({
                        id: item.id,
                        serapp_id: item.serapp_id,
                        icon: item.icon,
                        content: item.content,
                        type: item.serviceapps.type,
                        title: item.serviceapps.title,
                        subtitle: item.serviceapps.subtitle
                    })
                });
            } else {
                result = await db.ContentApp.findAll();
            }
        }

        return result? result: arrResult;
    } catch (error) {
        console.error('=== In getContentApp: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const createContentApp = async (data: ContentAppEntity, sub: number) => {
    try {
        if(
            !data ||
            (!data.serapp_id || data.serapp_id === 0) ||
            (!data.content || data.content === '')
        )
            return{ status: 400, message: "DataInput Invalid!"};

        let formatNoti: NotificationEntity;
        const {count} = await db.ContentApp.findAndCountAll({
            where: { serapp_id: data.serapp_id}
        });
        if(count === 0 || !count){
            formatNoti = {
                actionid: data.serapp_id,
                type_noti: 'app',
                status: 'new',
                actionBy: sub
            }
        } else {
            formatNoti = {
                actionid: data.serapp_id,
                type_noti: 'app',
                status: 'update',
                actionBy: sub
            }
        }
        if(count === 11) return{ status: 400, message: "The Number of Record Reaches Limit!"};

        await db.ContentApp.create(data);

        await createNoti(formatNoti, data);

        return{ status: 200, message: "Created Successfully!"};
    } catch (error) {
        console.error('=== In createContentApp: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const updateContentApp = async (data: Partial<ContentAppEntity>, sub: number) => {
    try {
        if(!data || (!data.id || data.id === 0))
            return{ status: 400, message: "DataInput Invalid!"};
        
        const contentappExisted = await db.ContentApp.findByPk(data.id);
        if(!contentappExisted) return{ status: 400, message: "NotFound Record Matching ID!"};

        const formatContentApp = {
            icon: data.icon? data.icon: contentappExisted.icon,
            content: data.content? data.content: contentappExisted.content
        }
        await db.ContentApp.update(formatContentApp, {
            where: { id: data.id}
        });

        const formatNoti: NotificationEntity = {
            actionid: contentappExisted.serapp_id,
            type_noti: 'app',
            status: 'update',
            actionBy: sub
        }
        await createNoti(formatNoti, data);

        return{ status: 200, message: "Updated Successfully!"};
    } catch (error) {
        console.error('=== In upateContentApp: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteContentApp = async (paramId: number, scope: string, sub: number) => {
    try {
        if(!paramId || paramId === 0) return{ status: 400, message: "DataInput Invalid!"};

        if(scope === 'all'){
            await db.ContentApp.destroy({
                where: { serapp_id: paramId}
            });
        } else {
            const serappExisted = await db.ContentApp.findByPk(paramId);
            const formatNoti: NotificationEntity = {
                actionid: serappExisted.serapp_id,
                type_noti: 'app',
                status: 'update',
                actionBy: sub
            }

            await db.ContentApp.destroy({ where: {id: paramId}});
            await createNoti(formatNoti, `Xóa nội dung contetnid: ${paramId}`);
        }

        return{ status: 200, message: "Deleted Sucessfully!"};
    } catch (error) {
        console.error('=== In deleteContentApp: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}