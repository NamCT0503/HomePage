import { Request, Response } from "express";
import { createSerAppPackage, deleteSerAppPackage, getAllSerApp, updateSerAppPackage } from "../service/serapp.service";
import { userRequest } from "../middleware/validate.user.middleware";

export const controller_getAllSerAppPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await getAllSerApp());
}

export const controller_createSerAppPackage = async (
    req: userRequest,
    res: Response
) => {
    res.json(await createSerAppPackage(req.body, req.user.sub));
}

export const controller_updateSerAppPackage = async (
    req: userRequest,
    res: Response
) => {
    res.json(await updateSerAppPackage(req.body, req.user.sub));
}

export const controller_deleteSerAppPackage = async (
    req: userRequest,
    res: Response
) => {
    res.json(await deleteSerAppPackage(req.body.id, req.user.sub));
}