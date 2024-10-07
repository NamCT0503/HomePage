import { Request, Response } from "express";
import { createContentWeb, deleteContentWeb, getContentWeb, updateContentWeb } from "../service/contentweb.services";

export const controller_getContentWeb = async (
    req: Request,
    res: Response
) => {
    const serweb_id = parseInt(req.params.id);
    res.json(await getContentWeb(serweb_id, req.params.ref));
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