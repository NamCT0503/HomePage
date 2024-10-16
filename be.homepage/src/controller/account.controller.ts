import { Request, Response } from "express";
import { changePassword, deleteAccount, getAccount, signin, signup, upateAccount } from "../service/account.services";
import { userRequest } from "../middleware/validate.user.middleware";

export const controll_getAccount = async (
    req: Request,
    res: Response
) => {
    const search = req.params.param;
    const isMyOwn = req.params.id? parseInt(req.params.id): 0;
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
    req: userRequest,
    res: Response
) => {
    const data = req.body;
    const sub = req.user.sub;
    res.json(await signup(data, sub));
}

export const controller_updateAccount = async (
    req: userRequest,
    res: Response
) => {
    res.json(await upateAccount(req.body, req.user));
}

export const controller_changePassword = async (
    req: userRequest,
    res: Response
) => {
    const oldpass = req.body?.oldpass;
    const newpass = req.body?.newpass;
    const sub = req.user.sub;
    res.json(await changePassword(oldpass, newpass, sub));
}

export const controller_deleteAccount = async (
    req: userRequest,
    res: Response
) => {
    const isMyOwn = req.user;
    res.json(await deleteAccount(req.body.id, isMyOwn));
}