import { Request, Response } from "express";
import { createContentWeb, deleteContentWeb, getContentWeb, updateContentWeb } from "../service/contentweb.services";
import { userRequest } from "../middleware/validate.user.middleware";

export const controller_getContentWeb = async (
    req: Request,
    res: Response
) => {
    const serweb_id = parseInt(req.params.id);
    res.json(await getContentWeb(serweb_id, req.params.ref));
}

export const controller_createContentWebPackage = async (
    req: userRequest,
    res: Response
) => {
    res.json(await createContentWeb(req.body, req.user.sub));
}

export const controller_updateContentWeb = async (
    req: userRequest,
    res: Response
) => {
    res.json(await updateContentWeb(req.body, req.user.sub));
}

export const controller_deleteContentWeb = async (
    req: userRequest,
    res: Response
) => {
    res.json(await deleteContentWeb(req.body.id, req.body.scope, req.user.sub));
}