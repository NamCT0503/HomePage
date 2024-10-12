import { NotificationEntity, ServiceWebEntity } from "../entities/app.entity";
import db from "../models";
import { deleteContentWeb } from "./contentweb.services";
import { createNoti } from "./notification.services";

export const getAllWebPackage = async () => {
    try {
        const result = await db.ServiceWeb.findAll();
        return result;
    } catch (error) {
        console.error('=== In getAllWebPackage: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

//Giới hạn bản ghi: 4
export const createSerWebPackage = async (data: ServiceWebEntity, sub: number) => {
    try {
        if(
            !data ||
            (data.title === '' || !data.title) ||
            (data.price === '' || !data.price)
        )
            return{ status: 400, message: "DataInput Invalid!"};
        
        const {count} = await db.ServiceWeb.findAndCountAll();
        if(count === 4) return{ status: 400, message: "The Number of Record Reaches Limit!"};

        const newSerWeb = await db.ServiceWeb.create(data);

        const formatNoti: NotificationEntity = {
            actionid: newSerWeb.id,
            type_noti: 'web',
            status: 'new',
            actionBy: sub
        }
        await createNoti(formatNoti, data);

        return{ status: 200, message: "Created Successfully!"};
    } catch (error) {
        console.error('=== In createSerWebPackage: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const updateSerWebPackage = async (data: Partial<ServiceWebEntity>, sub: number) => {
    try {
        if(!data.id) return{ status: 400, message: "DataInput Invalid!"};

        const serwebExisted = await db.ServiceWeb.findByPk(data.id);
        if(!serwebExisted) return{ status: 400, message: "NotFound Record Match DataInput!"};

        const formatSerWeb = {
            title: data.title? data.title: serwebExisted.title,
            price: data.price? data.price: serwebExisted.price
        }

        await db.ServiceWeb.update(formatSerWeb, {
            where: { id: data.id}
        });

        const formatNoti: NotificationEntity = {
            actionid: data.id,
            type_noti: 'web',
            status: 'update',
            actionBy: sub
        }
        await createNoti(formatNoti, data);

        return{ status: 200, message: "Updated Successfully!"};
    } catch (error) {
        console.error('=== In updateSerWebPackage: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteSerWebPackage = async (id: number, sub: number) => {
    try {
        if(!id) return{ status: 400, message: "DataInput Invalid!"};

        const serwebExisted = await db.ServiceWeb.findByPk(id);
        if(!serwebExisted) return{ status: 400, message: "NotFound Record Match DataInput!"};

        await deleteContentWeb(id, 'all', sub);

        await db.ServiceWeb.destroy({ where: { id: id}});

        const formatNoti: NotificationEntity = {
            actionid: id,
            type_noti: 'web',
            status: 'delete',
            actionBy: sub
        }
        await createNoti(formatNoti, 'Dịch vụ này đã bị xóa!');

        return{ status: 200, message: "Deleted Successfully!"};
    } catch (error) {
        console.error('=== In deleteSerWebPackage: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}