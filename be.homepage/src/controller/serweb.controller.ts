import { Request, Response } from "express";
import { createSerWebPackage, deleteSerWebPackage, getAllWebPackage, updateSerWebPackage } from "../service/serweb.services";

export const controller_getAllWebPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await getAllWebPackage());
}

export const controller_createWebPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await createSerWebPackage(req.body));
}

export const controller_updateSerWebPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await updateSerWebPackage(req.body));
}

export const controller_deleteSerWebPackage = async(
    req: Request,
    res: Response
) => {
    res.json(await deleteSerWebPackage(req.body.id));
}