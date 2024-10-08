import { Request, Response } from "express";
import { createBlogContent, deleteBlogContent, getBlogContent, updateBlogContent } from "../service/blog.content.services";

export const controller_getBlogContent = async (
    req: Request,
    res: Response
) => {
    res.json(await getBlogContent(req.params.blogid));
}

export const controller_createBlogContent = async (
    req: Request,
    res: Response
) => {
    const body = req.body;
    const img = req.file;

    const data = {
        blogid: body.blogid,
        type_content: body.type_content,
        img: body.type_content === 'image'? img: body.content
    }
    res.json(await createBlogContent(data));
}

export const controller_updateBlogContent = async (
    req: Request,
    res: Response
) => {
    const body = req.body;
    const img = req.file;
    const data = {
        id: body.id,
        type_content: body.type_content,
        img: body.type_content === 'image'? img: body.content
    }
    res.json(await updateBlogContent(data));
}

export const controller_deleteBlogContent = async (
    req: Request,
    res: Response
) => {
    res.json(await deleteBlogContent(req.params.id, req.params.scope));
}