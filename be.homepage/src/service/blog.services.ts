import multer from "multer";
import { BlogEntity, NotificationEntity } from "../entities/app.entity";
import db from "../models";
import path from "path";
import fs from "fs";
import { minioClient } from "../routes/app.route";
import * as dotenv from "dotenv";
import { Op, Sequelize, where } from "sequelize";
import { deleteBlogContent } from "./blog.content.services";
import { createNoti } from "./notification.services";

dotenv.config();

export const getBlogs = async (filter?: any, page?: string) => {
    try {
        let result: any;
        if(page === ':page') page = '1';
        if(filter === ':filter' || filter === '') filter = undefined;

        const recordPage = 6;
        const currentPage = page? parseInt(page): 1;
        const offset = (currentPage - 1) * recordPage;
        
        if(filter){
            if(filter === 'isOutstanding'){
                result = await db.Blog.findAndCountAll({
                    where: { isOutstanding: 1}
                });
                return result;
            } else if(filter === 'tagWebsite'){
                result = await db.Blog.findAndCountAll({
                    limit: recordPage,
                    offset: offset,
                    order: [['id', 'DESC']],
                    where: { tag: 'website', isOutstanding: 0}
                });
                // return result;
            } else if(filter === 'tagMobile'){
                result = await db.Blog.findAndCountAll({
                    where: { tag: 'mobile', isOutstanding: 0}
                });
                // return result;
            } else if(filter === 'isRandom'){
                result = await db.Blog.findAll({
                    limit: 4,
                    order: Sequelize.literal('RAND()'),
                    where: { isOutstanding: 0}
                });

                return result;
            } else {
                const condition = `%${filter}%`;
                const searchCondition = {
                    [Op.or]: [
                        { title: { [Op.like]: condition}},
                        { description: { [Op.like]: condition}}
                    ]
                }

                result = await db.Blog.findAndCountAll({
                    limit: recordPage,
                    offset: offset,
                    order: [['id', 'DESC']],
                    where: searchCondition
                });
            }
        } else {
            result = await db.Blog.findAndCountAll({
                limit: recordPage,
                offset: offset,
                order: [['id', 'DESC']],
                where: { isOutstanding: 0}
            });
        }
        
        return {
            totalItems: result.count,
            totalPages: Math.ceil(result.count / recordPage),
            currentPage: currentPage,
            recordPage: recordPage,
            blogs: result.rows
        };
    } catch (error) {
        console.error('=== In getBlogs: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const getBlogOrther = async (id: number | string, page?: number | string) => {
    try {
        if(!id || id === 0 || id === '') return{ status: 400, message: "ParamInput Invalid!"};

        const blogExisted = await db.Blog.findByPk(id);
        if(!blogExisted) return{ status: 400, message: "NotFound Record Match ParamInput!"};

        const recordPage = 3;
        const currentPage = (!page || page === ':page')? 1: parseInt(page as string);
        const offset = (currentPage - 1) * recordPage;

        const result = await db.Blog.findAndCountAll({
            limit: recordPage,
            offset: offset,
            order: [['id', 'DESC']],
            where: {
                id: {[Op.ne]: id},
                [Op.or]: [
                    { tag: {[Op.eq]: blogExisted.tag}},
                    { postedBy: blogExisted.postedBy}
                ]
            }
        });

        return{
            totalItems: result.count,
            totalPages: Math.ceil(result.count / recordPage),
            currentPage: currentPage,
            recordPage: recordPage,
            blogs: result.rows
        };
    } catch (error) {
        console.error('=== In getBlogOrther: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const createBlogOverview = async (data: any) => {
    try {
        if(
            !data ||
            !data.title || data.title === '',
            !data.description || data.description === ''
        ) 
        return{ status: 400, message: "DataInput Invalid!"};

        const blogs = await db.Blog.findAll({
            where: { isOutstanding: 1}
        });
        if(blogs){
            const checkIsOutstanding = parseInt(data.isOutstanding) === 1? true: false;
            if(blogs[0].dataValues.isOutstanding === checkIsOutstanding)
                return{ status: 400, message: "Just Only One Blog Outstanding!"};
        }

        const imgPath = data.img? await getPathImgFormBucket(data): null;
        // if(typeof(imgPath) !== 'string') return imgPath;

        const formatData = {
            img: imgPath,
            title: data.title,
            description: data.description,
            postedAt: data.postedAt,
            postedBy: data.postedBy,
            tag: data.tag,
            isOutstanding: data.isOutstanding,
            view: data.view
        }
        const newBlog = await db.Blog.create(formatData);

        const formatNoti: NotificationEntity = {
            actionid: newBlog.id,
            type_noti: 'blog',
            status: 'new',
            actionBy: data.postedBy
        }
        await createNoti(formatNoti, formatData);

        return{ status: 200, message: "Created Successfully!"};
    } catch (error) {
        console.error('=== In createBlogOverview: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const updateBlog = async (data: Partial<BlogEntity>, sub: number, imgReq?: any) => {
    try {
        if(
            !data ||
            (!data.id || data.id === 0) ||
            data.title === '' ||
            data.description === '' ||
            data.tag === ''
        ) return {status: 400, message: "DataInput Invalid!"};

        const blogExisted = await db.Blog.findByPk(data.id);
        if(!blogExisted) return{ status: 400, message: "NotFound Record Math ID!"};

        const outstandingExisted = await db.Blog.findAll({
            where: { isOutstanding: 1}
        });
        if(outstandingExisted && (data.isOutstanding === 1 || data.isOutstanding?.toString() === '1'))
            return{ status: 400, message: "Just Only One Blog Outstanding!"};

        let img: string, objectName: string;
        const bucketName = process.env.MinIO_BUCKETNAME!;
        if(imgReq){
            const imgData = { img: imgReq}
            const imgPath = await getPathImgFormBucket(imgData);
            if(typeof(imgPath) !== 'string') return imgPath;

            img = imgPath; 

            const blogDB = await db.Blog.findByPk(data.id);
            if(!blogDB) return{ status: 400, message: "NotFound Record Match DataInput!"};

            objectName = blogDB.img.split(`${bucketName}/`)[1];
            await deleteImgInBucket(bucketName, objectName);
        }

        const formatData = {
            img: img!? img: blogExisted.img,
            title: data.title? data.title: blogExisted.title,
            description: data.description? data.description: blogExisted.description,
            postedAt: Date.now(),
            tag: data.tag? data.tag: blogExisted.tag,
            isOutstanding: data.isOutstanding? data.isOutstanding: blogExisted.isOutstanding
        }
        await db.Blog.update(formatData, {
            where: { id: data.id}
        });

        const formatNoti: NotificationEntity = {
            actionid: data.id,
            type_noti: 'blog',
            status: 'update',
            actionBy: sub
        }
        await createNoti(formatNoti, data);

        return{ status: 200, message: "Updated Successfully!"};
    } catch (error) {
        console.error('=== In updateBlog: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteBlog = async (id: number | string, sub: number) => {
    try {
        if(!id || id === 0 || id === '')
            return{ status: 400, message: "DataInput Invalid!"};

        const blogExisted = await db.Blog.findByPk(id);
        if(!blogExisted) return{ status: 400, message: "NotFound Record Match DataInput!"};

        if(blogExisted.img ){
            const bucketName = process.env.MinIO_BUCKETNAME!;
            const objectName = blogExisted.img.split(`${bucketName}/`)[1];
            await deleteImgInBucket(bucketName, objectName);
        }

        await deleteBlogContent(id, 'all', sub);

        await db.Blog.destroy({
            where: { id: id}
        });

        const formatNoti: NotificationEntity = {
            actionid: id as number,
            type_noti: 'blog',
            status: 'delete',
            actionBy: sub
        }
        await createNoti(formatNoti, 'Bài viết này đã bị xóa!');

        return{ status: 200, message: "Deleted Successfully!"};
    } catch (error) {
        console.error('=== In deleteBlog: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export function getTimeLocal(){
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
}

export const getPathImgFormBucket = async (data: any) => {
    try {
        const fileName = `${Date.now()}_${data.img?.originalname}`
        const bucketName = process.env.MinIO_BUCKETNAME as string;
        const buckets = await minioClient.listBuckets();
        const bucketExisted = buckets.some(bucket => bucket.name === bucketName);
        if(!bucketExisted){
            await minioClient.makeBucket(bucketName, 'us-east-1');
        }

        const uploadParams = {
            Bucket: bucketName,
            Body: data.img.buffer,
            Size: data.img.size,
            ContentType: data.img.mimetype
        };
        await minioClient.putObject(
            uploadParams.Bucket,
            fileName,
            uploadParams.Body,
            uploadParams.Size,
            { 'Content-Type': uploadParams.ContentType }
        );

        return `http://localhost:9000/${bucketName}/${fileName}`;
    } catch (error) {
        console.error('=== In getPathImgFormBucket: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteImgInBucket = async (bucketName: string, objectName: string) => {
    try {
        if(bucketName === '' || objectName === '')
            return{ status: 500, message: 'DataInput Img Bucket Invalid!'};

        await minioClient.removeObject(bucketName, objectName);
    } catch (error) {
        console.error('=== In deleteImgInBucket: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}