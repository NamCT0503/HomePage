import { NextFunction, Request, Response } from "express";
import { userRequest } from "./validate.user.middleware";
import db from "../models";
import Blog from "../models/Blog";

const actionOneSelfMiddelware = () => {
    return async (req: userRequest, res: Response, nextFunction: NextFunction) => {
        try {
            let accId: any;
            if(req.body.id || req.params.id){
                accId = await db.BlogContent.findOne({
                    attributes: ['id', 'blogid'],
                    include: [
                        {
                            model: Blog,
                            as: 'blogs',
                            attributes: ['postedBy']
                        }
                    ],
                    where: { id: req.body.id? req.body.id: req.params.id}
                })
            }

            let accIdBlog: any;
            if(req.body.idBlog){
                accIdBlog = await db.Blog.findByPk(req.body?.idBlog)
            }
            const accIdPostedBy = accId?.dataValues?.blogs?.dataValues?.postedBy;

            const postedByBlog = req.body?.postedBy? req.body?.postedBy: accIdBlog?.postedBy;
            const postedBy = req.body?.postedBy? req.body?.postedBy: accIdPostedBy;
            const sub = req.user.sub;
            if((postedByBlog != sub) && (postedBy !== sub)) return res.status(400).json({ message: "Account NotEnough Rights!"});

            nextFunction();
        } catch (error) {
            console.log('[ActionOneSelfMiddelware] Lỗi: '+error);
            res.status(500).json({messsage: 'ServerError: ', error});
        }
    }
}

export default actionOneSelfMiddelware;