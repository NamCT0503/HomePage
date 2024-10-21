import { BlogContentEntity, NotificationEntity } from "../entities/app.entity";
import db from "../models";
import Account from "../models/Account";
import Blog from "../models/Blog";
// import { deleteImgInBucket, getPathImgFormBucket } from "./blog.services";
import * as dotenv from "dotenv";
import { createNoti } from "./notification.services";
import path from "path";
import fs from "fs";

dotenv.config();

export const getBlogContent = async (blogId: string | number) => {
    try {
        if(!blogId || blogId === 0 || blogId === '')
            return{ status: 400, message: "DataInput Invalid!"};

        if(blogId === ':blogid') return{ status: 400, message: "ParamInput Invalid!"};

        const result = await db.BlogContent.findAll({
            include: {
                model: Blog,
                as: 'blogs',
                attributes: ['img', 'title', 'description' ,'postedBy', 'tag', 'isOutstanding'],
                include: {
                    model: Account,
                    as: 'accounts',
                    attributes: ['username']
                }
            },
            where: { blogid: blogId}
        });

        if(!result || result.length === 0) 
            return{ status: 400, message: "NotFound Record Match DataInput!"};

        let formatResult: any[] = [];
        result.map((items: any) => {
            formatResult.push({
                id: items.id,
                blogid: items.blogid,
                stt: items.stt,
                type_content: items.type_content,
                content: items.content,
                postedBy: items.blogs.accounts.username,
                postedAccId: items.blogs.postedBy,
                blogImg: items.blogs.img,
                blogTitle: items.blogs.title,
                blogDesc: items.blogs.description,
                blogTag: items.blogs.tag,
                blogOutstanding: items.blogs.isOutstanding,
                createdAt: items.createdAt,
                updatedAt: items.updatedAt,
                deletedAt: items.deletedAt
            });
        });

        return formatResult.sort((a, b) => a.stt - b.stt);
    } catch (error) {
        console.error('=== In getBlogContent: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const createBlogContent = async (data: any, sub: number) => {
    try {
        if(
            !data ||
            (!data.blogid || data.blogid === 0) ||
            (!data.stt || data.stt === 0) ||
            (!data.type_content || data.type_content === '') ||
            (!data.img || data.img === '')
        ) return{ status: 400, message: "DataInput Invalid!"};

        const blogExisted = await db.Blog.findByPk(data.blogid);
        if(!blogExisted) return{ status: 400, message: "NotFound Record Match DataInput!"};

        let content = data.img, formatNoti: NotificationEntity;
        if(data.type_content === 'image'){
            content = data?.img.filename;
        }

        const findBlogId = await db.BlogContent.findOne({
            where: { blogid: data.blogid}
        });
        if(!findBlogId){
            formatNoti = {
                actionid: data.blogid,
                type_noti: 'blog',
                status: 'new',
                actionBy: sub
            }
        } else {
            formatNoti = {
                actionid: data.blogid,
                type_noti: 'blog',
                status: 'update',
                actionBy: sub
            }
        }

        const formatData = {
            blogid: data.blogid,
            stt: data.stt,
            type_content: data.type_content,
            content: content
        }
        await db.BlogContent.create(formatData);

        await createNoti(formatNoti, data);

        return{ status: 200, message: "Created Successfully!"};
    } catch (error) {
        console.error('=== In createBlogContent: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const updateBlogContent = async (data: any, sub: number) => {
    try {
        if(
            !data ||
            (!data.id || data.id === 0)
        ) return{ status: 400, message: "DataInput Invalid!"};

        const blogExisted = await db.BlogContent.findByPk(data.id);
        if(!blogExisted) return{ status: 400, message: "NotFound Record Match DataInput!"};

        let formatData: any;
        if(data.type_content === 'image'){
            const pathImg = path.join(__dirname, '../../public/uploads', blogExisted.content);
            fs.unlink(pathImg, (error) => {
                if(error) return{ status: 400, message: "Lỗi thao tác với dữ liệu file!"};
            })

            formatData = {
                type_content: 'image',
                content: `${data.img.filename}`
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

        // const formatNoti: NotificationEntity = {
        //     actionid: blogExisted.serapp_id,
        //     type_noti: 'blog',
        //     status: 'update',
        //     actionBy: sub
        // }
        // await createNoti(formatNoti, data);

        return{ status: 200, message: "Updated Successfully!"};
    } catch (error) {
        console.error('=== In updateBlogContent: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const deleteBlogContent = async (id: string | number, scope: string, sub: number) => {
    try {
        if(!id || id === '' || id === 0)
            return{ status: 400, message: "DataInput Invalid!"};

        if(scope === 'all'){
            const bcExisted = await db.BlogContent.findAll({
                where: { blogid: id}
            });
            if(!bcExisted || bcExisted.length === 0) return{ status: 400, message: "NotFound Record Match DataInput!"};

            await bcExisted?.map(async (items: any) => {
                if(items.type_content === 'image'){
                    const pathImg = path.join(__dirname, '../../public/uploads', items.content);
                    fs.unlink(pathImg, (error) => {
                        if(error) return{ status: 400, message: "Lỗi thao tác với dữ liệu file!"};
                    })
                }
            });

            await db.BlogContent.destroy({
                where: { blogid: id}
            });
        } else {
            const bcExisted = await db.BlogContent.findByPk(id);
            if(!bcExisted) return{ status: 400, message: "NotFound Record Match DataInput!"};

            if(bcExisted.type_content === 'image'){
                const pathImg = path.join(__dirname, '../../public/uploads', bcExisted.content);
                fs.unlink(pathImg, (error) => {
                    if(error) return{ status: 400, message: "Lỗi thao tác với dữ liệu file!"};
                })
            }

            await db.BlogContent.destroy({
                where: { id: id}
            });

            // const formatNoti: NotificationEntity = {
            //     actionid: bcExisted.serapp_id,
            //     type_noti: 'app',
            //     status: 'update',
            //     actionBy: sub
            // }
            // await createNoti(formatNoti, `Xóa nội dung contentid: ${id}`);
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