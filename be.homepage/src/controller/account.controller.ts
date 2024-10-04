import { Request, Response } from "express";
import { getAccount, signin, signup } from "../service/account.services";

export const controll_getAccount = async (
    req: Request,
    res: Response
) => {
    const search = req.body.param
    res.json(await getAccount(search));
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