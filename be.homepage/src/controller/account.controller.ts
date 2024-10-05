import { Request, Response } from "express";
import { deleteAccount, getAccount, signin, signup, upateAccount } from "../service/account.services";
import { userRequest } from "../middleware/validate.user.middleware";

export const controll_getAccount = async (
    req: Request,
    res: Response
) => {
    const search = req.body.param;
    const isMyOwn = req.body.id;
    res.json(await getAccount(search, isMyOwn));
}

export const controller_signin = async (
    req: Request,
    res: Response
) => {
    const username = req.body.username;
    const password = req.body.password;
    res.json(await signin(username, password));
}

export const controller_signup = async (
    req: Request,
    res: Response
) => {
    const data = req.body;
    res.json(await signup(data));
}

export const controller_updateAccount = async (
    req: userRequest,
    res: Response
) => {
    res.json(await upateAccount(req.body, req.user));
}

export const controller_deleteAccount = async (
    req: userRequest,
    res: Response
) => {
    const isMyOwn = req.user;
    res.json(await deleteAccount(req.body.id, isMyOwn));
}