import { NextFunction, Request, Response } from "express";
import { userRequest } from "./validate.user.middleware";

const actionOneSelfMiddelware = () => {
    return (req: userRequest, res: Response, nextFunction: NextFunction) => {
        try {
            const postedBy = req.body.postedBy;
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