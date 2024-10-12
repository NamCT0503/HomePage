import { Response } from "express";
import { userRequest } from "../middleware/validate.user.middleware";
import { getNotiFollowAccont } from "../service/notification.services";

export const controll_getAllNotifyFollowAccount = async (
    req: userRequest,
    res: Response
) => {
    res.json(await getNotiFollowAccont(req.user.sub));
}