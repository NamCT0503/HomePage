import { Response } from "express";
import { userRequest } from "../middleware/validate.user.middleware";
import { updateFieldSeen } from "../service/notidetail.services";

export const controll_updateFieldSeen = async (
    req: userRequest,
    res: Response
) => {
    res.json(await updateFieldSeen(req.user.sub, req.body.notiid));
}