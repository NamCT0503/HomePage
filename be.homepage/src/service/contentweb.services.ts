import { ContentWebEntity } from "../entities/app.entity";
import db from "../models";
import ServiceWeb from "../models/ServiceWeb";

//Lấy tất cả danh sách nội dung
//Hoặc lấy nội dung theo serweb_id
export const getContentWeb = async (id: number, ref: string) => {
    try {
        let result: any;
        if(id){
            if(ref !== ':ref'){
                result = await db.ContentWeb.findAll({
                    attributes: ['id', 'serweb_id', 'content'],
                    include: [{
                        model: ServiceWeb,
                        as: 'servicewebs',
                        attributes: ['title', 'price']
                    }],
                    where: { serweb_id: id}
                });

                const arrResult: any[] = [];
                await result?.map((item: any) => {
                    arrResult.push({
                        id: item.id,
                        serweb_id: item.serweb_id,
                        title: item.servicewebs.title,
                        price: item.servicewebs.price
                    })
                })

                return arrResult;
            }

            const contentwebExxisted = await db.ServiceWeb.findByPk(id);
            if(!contentwebExxisted)
                return{ status: 400, message: "NotFound Record Match ID!"};

            result = await db.ContentWeb.findAll({
                where: { serweb_id: id}
            });
            return result;
        }

        if(ref !== ':ref'){
            const findAll = await db.ContentWeb.findAll({
                attributes: ['id', 'serweb_id', 'content'],
                include: [{
                    model: ServiceWeb,
                    as: 'servicewebs',
                    attributes: ['title', 'price']
                }],
            });

            const arrResult: any[] = [];
            await findAll?.map((items: any) => {
                arrResult.push({
                    id: items.id,
                    serweb_id: items.serweb_id,
                    title: items.servicewebs.title,
                    price: items.servicewebs.price,
                    content: items.content
                })
            });

            return arrResult;
        }

        result = await db.ContentWeb.findAll();
        return result;
    } catch (error) {
        console.error('=== In getContent: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const createContentWeb = async (data: ContentWebEntity) => {
    try {
        if(
            !data ||
            (data.serweb_id === 0 || !data.serweb_id) ||
            (data.content === '' || !data.content)
        )
            return{ status: 400, message: "DataInput Invalid!"};

        const {count} = await db.ContentWeb.findAndCountAll({ where: {serweb_id: data.serweb_id}});
        if(count === 10) return{ status: 400, message: "The Number of Record Reaches Limit!"};

        await db.ContentWeb.create(data);
        return{ status: 200, message: "Created Successflly!"};
    } catch (error) {
        console.error('=== In createContentWeb: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const updateContentWeb = async (data: Partial<ContentWebEntity>) => {
    try {
        if(
            !data ||
            (!data.content || data.content === '') ||
            (!data.id || data.id === 0)
        )
            return{ status: 400, message: "DataInput Invalid!"};

        const contentWeb = await db.ContentWeb.findByPk(data.id);
        if(!contentWeb) return{ status: 400, message: "NotFound Record Match ID!"};

        const formatContentWeb = {
            content: data.content? data.content: contentWeb.content
        }
        await db.ContentWeb.update(formatContentWeb, {
            where: {id: data.id}
        });

        return{ status: 200, message: "Updated Successfully!"};
    } catch (error) {
        console.error('=== In updateContentWeb: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteContentWeb = async (id: number, scope: string) => {
    try {
        if(!id) return{ status: 400, message: "DataInput Invalid!"};

        if(!scope){
            await db.ContentWeb.destroy({
                where: { id: id}
            });
        } else {
            await db.ContentWeb.destroy({
                where: { serweb_id: id}
            })
        }

        return{ status: 200, message: "Deleted Successfully!"};
    } catch (error) {
        console.error('=== In deleteContentWeb: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}