import { Request, Response } from "express";
import { createSerAppPackage, deleteSerAppPackage, getAllSerApp, updateSerAppPackage } from "../service/serapp.service";

export const controller_getAllSerAppPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await getAllSerApp());
}

export const controller_createSerAppPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await createSerAppPackage(req.body));
}

export const controller_updateSerAppPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await updateSerAppPackage(req.body));
}

export const controller_deleteSerAppPackage = async (
    req: Request,
    res: Response
) => {
    res.json(await deleteSerAppPackage(req.body.id));
}