import express from "express";
import { controll_getAccount, controller_signin, controller_signup } from "../controller/account.controller";
import { signin } from "../service/account.services";
import validateUserMiddleware from "../middleware/validate.user.middleware";
import checkRoleAccount from "../middleware/check.role.middleware";

const router = express.Router();

//Account
router.get('/get-account', validateUserMiddleware() as any, checkRoleAccount() as any ,controll_getAccount);
router.post('/login', controller_signin);
router.post('/signup', validateUserMiddleware() as any, checkRoleAccount() as any, controller_signup);

export default router;