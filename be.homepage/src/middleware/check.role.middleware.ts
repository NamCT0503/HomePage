import { Response, NextFunction } from "express";
import { userRequest } from "./validate.user.middleware";

const checkRoleAccount = () => {
    return (req: userRequest, res: Response, nextFunction: NextFunction) => {
        try {
            const idAccount = req.params.id
            const roleAccount = req.user.role;
            const subAccount = req.user.sub;
            if(!roleAccount) return res.status(500).json({message: 'ServerError: SubAccount Undefind!'});
            if(roleAccount === 'admin' && idAccount != subAccount) return res.status(400).json({message: 'Accont NotEnough Rights!'});

            nextFunction();
        } catch (error) {
            console.log('[CheckRoleMiddelware] Lỗi: '+error);
            res.status(500).json({messsage: 'ServerError: ', error});
        }
    }
}

export default checkRoleAccount;