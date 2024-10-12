import express from "express";
import validateUserMiddleware from "../middleware/validate.user.middleware";
import { controll_updateFieldSeen } from "../controller/noti.detail.controller";
import { controll_getAllNotifyFollowAccount } from "../controller/notification.controller";


const adminRouter = express.Router();

//Notification
adminRouter.get('/notification/get-all', validateUserMiddleware() as any, controll_getAllNotifyFollowAccount);

//NotiDetail
adminRouter.put('/notification/detail/seen-true', validateUserMiddleware() as any, controll_updateFieldSeen);

export default adminRouter;