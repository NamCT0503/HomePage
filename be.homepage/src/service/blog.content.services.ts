import { BlogContentEntity } from "../entities/app.entity";
import db from "../models";
import { deleteImgInBucket, getPathImgFormBucket } from "./blog.services";
import * as dotenv from "dotenv";

dotenv.config();

export const getBlogContent = async (blogId: string | number) => {
    try {
        if(!blogId || blogId === 0 || blogId === '')
            return{ status: 400, message: "DataInput Invalid!"};

        if(blogId === ':blogid') return{ status: 400, message: "ParamInput Invalid!"};

        const result = await db.BlogContent.findAll({
            where: { blogid: blogId}
        });
        console.log(result);
        if(!result || result.length === 0) 
            return{ status: 400, message: "NotFound Record Match DataInput!"};

        return result;
    } catch (error) {
        console.error('=== In getBlogContent: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const createBlogContent = async (data: any) => {
    try {
        if(
            !data ||
            (!data.blogid || data.blogid === 0) ||
            (!data.type_content || data.type_content === '') ||
            (!data.img || data.img === '')
        ) return{ status: 400, message: "DataInput Invalid!"};

        const blogExisted = await db.Blog.findByPk(data.blogid);
        if(!blogExisted) return{ status: 400, message: "NotFound Record Match DataInput!"};

        let content = data.img;
        if(data.type_content === 'image'){
            const imgPath = await getPathImgFormBucket(data);
            if(typeof(imgPath) !== 'string') return imgPath;

            content = imgPath;
        }

        const formatData = {
            blogid: data.blogid,
            type_content: data.type_content,
            content: content
        }

        // return formatData.content.split(/\r?\n/)[1];

        await db.BlogContent.create(formatData);
        return{ status: 200, message: "Created Successfully!"};
    } catch (error) {
        console.error('=== In createBlogContent: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const updateBlogContent = async (data: any) => {
    try {
        if(
            !data ||
            (!data.id || data.id === 0)
        ) return{ status: 400, message: "DataInput Invalid!"};

        const blogExisted = await db.BlogContent.findByPk(data.id);
        if(!blogExisted) return{ status: 400, message: "NotFound Record Match DataInput!"};

        let formatData: any;
        if(data.type_content === 'image'){
            const newImg = await getPathImgFormBucket(data);
            if(typeof(newImg) !== 'string') return newImg;

            const imgPath = blogExisted.content;
            const bucketName = process.env.MinIO_BUCKETNAME!;
            const objectName = imgPath.split(`${bucketName}/`)[1];

            await deleteImgInBucket(bucketName, objectName);

            formatData = {
                type_content: 'image',
                content: newImg
            }
        } else {
            formatData = {
                type_content: (data.type_content && data.type_content !== '')? 
                                data.type_content: blogExisted.type_content,
                content: (data.img && data.img !== '')?
                         data.img: blogExisted.content
            }
        }

        await db.BlogContent.update(formatData, {
            where: { id: data.id}
        });

        return{ status: 200, message: "Updated Successfully!"};
    } catch (error) {
        console.error('=== In updateBlogContent: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteBlogContent = async (id: string | number, scope: string) => {
    try {
        if(!id || id === '' || id === 0)
            return{ status: 400, message: "DataInput Invalid!"};

        if(scope === 'all'){
            const bcExisted = await db.BlogContent.findAll({
                where: { blogid: id}
            });
            if(!bcExisted || bcExisted.length === 0) return{ status: 400, message: "NotFound Record Match DataInput!"};

            const bucketName = process.env.MinIO_BUCKETNAME!;
            await bcExisted?.map(async (items: any) => {
                if(items.type_content === 'image'){
                    const objectName = items.content.split(`${bucketName}/`)[1];
                    await deleteImgInBucket(bucketName, objectName);
                }
            });

            await db.BlogContent.destroy({
                where: { blogid: id}
            });
        } else {
            const bcExisted = await db.BlogContent.findByPk(id);
            if(!bcExisted) return{ status: 400, message: "NotFound Record Match DataInput!"};

            if(bcExisted.type_content === 'image'){
                const bucketName = process.env.MinIO_BUCKETNAME!;
                const objectName = bcExisted.content.split(`${bucketName}/`)[1];

                await deleteImgInBucket(bucketName, objectName);
            }

            await db.BlogContent.destroy({
                where: { id: id}
            });
        }

        return{ status: 200, message: "Deleted Successfully!"};
    } catch (error) {
        console.error('=== In deleteBlogContent: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}