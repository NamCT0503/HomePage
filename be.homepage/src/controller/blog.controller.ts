import { Request, Response } from "express";
import { userRequest } from "../middleware/validate.user.middleware";
import { createBlogOverview, deleteBlog, getBlogOrther, getBlogs, getTimeLocal, updateBlog } from "../service/blog.services";

export const controller_getBlogs = async (
    req: Request,
    res: Response
) => {
    const filter = req.params.filter;
    const page = req.params.page;
    res.json(await getBlogs(filter, page));
}

export const controller_getOrtherBlogs = async (
    req: Request,
    res: Response
) => {
    res.json(await getBlogOrther(req.params.id, req.params.page));
}

export const controller_createBlogOverview = async (
    req: userRequest,
    res: Response
) => {
    const uid = req.user.sub;
    const postedAt = new Date();
    const body = req.body;
    const img = req.file;

    const data = {
        img: img,
        title: body.title,
        description: body.description,
        postedAt: postedAt,
        postedBy: uid,
        tag: body.tag,
        isOutstanding: body.isOutstanding? body.isOutstanding: 0,
        view: 0
    }

    res.json(await createBlogOverview(data));
}

export const controller_updateBlog = async (
    req: Request,
    res: Response
) => {
    res.json(await updateBlog(req.body, req.file));
}

export const controller_deleteBlog = async (
    req: Request,
    res: Response
) => {
    res.json(await deleteBlog(req.body.id));
}