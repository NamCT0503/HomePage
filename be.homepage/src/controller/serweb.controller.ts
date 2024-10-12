import { Request, Response } from "express";
import { createSerWebPackage, deleteSerWebPackage, getAllWebPackage, updateSerWebPackage } from "../service/serweb.services";
import { userRequest } from "../middleware/validate.user.middleware";

export const controller_getAllWebPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await getAllWebPackage());
}

export const controller_createWebPackage = async (
    req: userRequest,
    res: Response
) => {
    res.json(await createSerWebPackage(req.body, req.user.sub));
}

export const controller_updateSerWebPackage = async (
    req: userRequest,
    res: Response
) => {
    res.json(await updateSerWebPackage(req.body, req.user.sub));
}

export const controller_deleteSerWebPackage = async(
    req: userRequest,
    res: Response
) => {
    res.json(await deleteSerWebPackage(req.body.id, req.user.sub));
}