import { NextFunction, Request, Response } from "express";
import { userRequest } from "./validate.user.middleware";
import db from "../models";
import Blog from "../models/Blog";

const actionOneSelfMiddelware = () => {
    return async (req: userRequest, res: Response, nextFunction: NextFunction) => {
        try {
            const accId = await db.BlogContent.findOne({
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

            const postedBy = req.body.postedBy? req.body.postedBy: accId?.blogs.postedBy;
            const sub = req.user.sub;
            if(postedBy != sub) return res.status(400).json({ message: "Account NotEnough Rights!"});

            nextFunction();
        } catch (error) {
            console.log('[ActionOneSelfMiddelware] Lỗi: '+error);
            res.status(500).json({messsage: 'ServerError: ', error});
        }
    }
}

export default actionOneSelfMiddelware;