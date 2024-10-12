import { NotificationEntity, ServiceAppEntity } from "../entities/app.entity";
import db from "../models";
import { deleteContentApp } from "./contentapp.service";
import { createNoti } from "./notification.services";

export const getAllSerApp = async () => {
    try {
        const result = await db.ServiceApp.findAll();
        return result;
    } catch (error) {
        console.error('=== In getAllSerApp: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const createSerAppPackage = async (data: ServiceAppEntity, sub: number) => {
    try {
        if(
            !data ||
            (!data.title || data.title === '') ||
            (!data.type || data.type === '') ||
            (!data.subtitle || data.subtitle === '')
        ) 
            return{ status: 400, message: "DataInput Invalid!"};

        const {count} = await db.ServiceApp.findAndCountAll();
        if(count === 3) return{ status: 400, message: "The Number of Record Reaches Limit!"};

        const newSerApp = await db.ServiceApp.create(data);

        const formatNoti: NotificationEntity = {
            actionid: newSerApp.id,
            type_noti: 'app',
            status: 'new',
            actionBy: sub
        }
        await createNoti(formatNoti, data);

        return{ status: 200, message: "Created Successfully!"};
    } catch (error) {
        console.error('=== In createSerAppPackage: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const updateSerAppPackage = async (data: Partial<ServiceAppEntity>, sub: number) => {
    try {
        if(!data || (!data.id || data.id === 0)) 
            return{ status: 400, message: "DataInput Invalid!"};

        const serappExisted = await db.ServiceApp.findByPk(data.id);
        if(!serappExisted) return{ status: 400, message: "NotFound Record Match ID!"};

        const formatSerApp = {
            type: data.type? data.type: serappExisted.type,
            title: data.title? data.title: serappExisted.title,
            subtitle: data.subtitle? data.subtitle: serappExisted.subtitle
        }
        await db.ServiceApp.update(formatSerApp, {
            where: { id: data.id}
        });

        const formatNoti: NotificationEntity = {
            actionid: data.id,
            type_noti: 'app',
            status: 'update',
            actionBy: sub
        }
        await createNoti(formatNoti, data);

        return{ status: 200, message: "Updated Successfully!"};
    } catch (error) {
        console.error('=== In upateSerAppPackage: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteSerAppPackage = async (id: number, sub: number) => {
    try {
        if(!id || id === 0) return{ status: 400, message: "DataInput Invali!"};

        await deleteContentApp(id, 'all', sub);

        await db.ServiceApp.destroy({ where: { id: id}});

        const formatNoti: NotificationEntity = {
            actionid: id,
            type_noti: 'app',
            status: 'delete',
            actionBy: sub
        }
        await createNoti(formatNoti, 'Dịch vụ này đã bị xóa!');

        return{ status: 200, message: "Deleted Successfully!"};
    } catch (error) {
        console.error('=== In deleteSerAppPackage: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}