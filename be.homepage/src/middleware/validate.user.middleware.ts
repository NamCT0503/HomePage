import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export interface userRequest extends Request {
    user?: any
}

const validateUserMiddleware = function(){
    return function(req: userRequest, res: Response, nextFunction: NextFunction){
        try {
            const authHeder = req.headers.authorization;

            if(!authHeder || !authHeder.startsWith('Bearer ')){
                return res.status(400).json({message: 'Token không hợp lệ theo định dạng Bearer Token'});
            }

            const token = authHeder.split(' ')[1];
            const userInfo = jwt.verify(token, process.env.JWT_SECRET as string)
            req.user = userInfo;

            nextFunction();
        } catch (error) {
            console.log('[ValidateUserMiddleware] Lỗi: '+error);
            res.status(400).json({messsage: 'Lỗi quá trình xác thực tài khoản!'})
        }
    }
}

export default validateUserMiddleware;