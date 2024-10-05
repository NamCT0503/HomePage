import { Request, Response } from "express";
import { createContentWeb, deleteContentWeb, getContentWeb, updateContentWeb } from "../service/contentweb.services";

export const controller_getContentWeb = async (
    req: Request,
    res: Response
) => {
    res.json(await getContentWeb(req.body.serweb_id));
}

export const controller_createContentWebPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await createContentWeb(req.body));
}

export const controller_updateContentWeb = async (
    req: Request,
    res: Response
) => {
    res.json(await updateContentWeb(req.body));
}

export const controller_deleteContentWeb = async (
    req: Request,
    res: Response
) => {
    res.json(await deleteContentWeb(req.body.id, req.body.scope));
}