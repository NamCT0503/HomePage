import { Request, Response, NextFunction } from "express"
import db from "../models";

const checkOnlyFieldMiddleWare = () => {
    return async (req: Request, res: Response, nextFunction: NextFunction) => {
        try {
            const dataReq = req.body;
            if(dataReq.username){
                const checkUsername = await db?.Account?.findOne({
                    where: { username: dataReq.username}
                })

                if(checkUsername) return res.status(400).json({ message: 'Username Existed!'});
            }

            if(dataReq.email){
                const checkEmail = await db?.Account?.findOne({
                    where: { email: dataReq.email}
                })

                if(checkEmail) return res.status(400).json({ message: 'Email has been used!'});
            }
        } catch (error) {
            console.log('[CheckOnlyFieldMiddleWare] Lỗi: ', error);
            res.status(500).json({ message: 'ServerError: ', error});
        }
    }
}

export default checkOnlyFieldMiddleWare;