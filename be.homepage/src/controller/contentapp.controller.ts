import { Request, Response } from "express";
import { createContentApp, deleteContentApp, getContentApp, updateContentApp } from "../service/contentapp.service";

export const controller_getContentApp = async (
    req: Request,
    res: Response
) => {
    res.json(await getContentApp(req.body.serapp_id));
}

export const controller_createContentApp = async (
    req: Request,
    res: Response
) => {
    res.json(await createContentApp(req.body));
}

export const controller_updateContentApp = async (
    req: Request,
    res: Response
) => {
    res.json(await updateContentApp(req.body));
}

export const controller_deleteContentApp = async (
    req: Request,
    res: Response
) => {
    res.json(await deleteContentApp(req.body.param_id, req.body.scope));
}