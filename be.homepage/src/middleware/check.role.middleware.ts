import { Response, NextFunction } from "express";
import { userRequest } from "./validate.user.middleware";

const checkRoleAccount = () => {
    return (req: userRequest, res: Response, nextFunction: NextFunction) => {
        try {
            const roleAccount = req.user.role;
            if(!roleAccount) return res.status(500).json({message: 'ServerError: SubAccount Undefind!'});
            if(roleAccount === 'admin') return res.status(400).json({message: 'Accont NotEnough Rights!'});

            nextFunction();
        } catch (error) {
            console.log('[CheckRoleMiddelware] Lỗi: '+error);
            res.status(500).json({messsage: 'ServerError: ', error});
        }
    }
}

export default checkRoleAccount;