import { ContentAppEntity } from "../entities/app.entity";
import db from "../models";

export const getContentApp = async (serappId: number) => {
    try {
        if(serappId){
            if(serappId === 0) return{ status: 400, message: "DataInput Invalid!"};

            const result = await db.ContentApp.findAll({
                where: { serapp_id: serappId}
            });
            return result;
        }

        const result = await db.ContentApp.findAll();
        return result;
    } catch (error) {
        console.error('=== In getContentApp: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const createContentApp = async (data: ContentAppEntity) => {
    try {
        if(
            !data ||
            (!data.serapp_id || data.serapp_id === 0) ||
            (!data.content || data.content === '')
        )
            return{ status: 400, message: "DataInput Invalid!"};

        const {count} = await db.ContentApp.findAndCountAll({
            where: { serapp_id: data.serapp_id}
        });
        if(count === 11) return{ status: 400, message: "The Number of Record Reaches Limit!"};

        await db.ContentApp.create(data);
        return{ status: 200, message: "Created Successfully!"};
    } catch (error) {
        console.error('=== In createContentApp: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const updateContentApp = async (data: Partial<ContentAppEntity>) => {
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

        return{ status: 200, message: "Updated Successfully!"};
    } catch (error) {
        console.error('=== In upateContentApp: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteContentApp = async (paramId: number, scope: string) => {
    try {
        if(!paramId || paramId === 0) return{ status: 400, message: "DataInput Invalid!"};

        if(scope){
            await db.ContentApp.destroy({
                where: { serapp_id: paramId}
            });
        } else {
            await db.ContentApp.destroy({ where: {id: paramId}});
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