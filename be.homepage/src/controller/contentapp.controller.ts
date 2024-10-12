import { Request, Response } from "express";
import { createContentApp, deleteContentApp, getContentApp, updateContentApp } from "../service/contentapp.service";
import { userRequest } from "../middleware/validate.user.middleware";

export const controller_getContentApp = async (
    req: Request,
    res: Response
) => {
    const serapp_id = parseInt(req.params.id);
    const ref = req.params.ref;
    res.json(await getContentApp(serapp_id, ref));
}

export const controller_createContentApp = async (
    req: userRequest,
    res: Response
) => {
    res.json(await createContentApp(req.body, req.user.sub));
}

export const controller_updateContentApp = async (
    req: userRequest,
    res: Response
) => {
    res.json(await updateContentApp(req.body, req.user.sub));
}

export const controller_deleteContentApp = async (
    req: userRequest,
    res: Response
) => {
    res.json(await deleteContentApp(req.body.param_id, req.body.scope, req.user.sub));
}