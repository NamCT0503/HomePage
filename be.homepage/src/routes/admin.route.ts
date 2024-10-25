import express from "express";
import validateUserMiddleware from "../middleware/validate.user.middleware";
import { controll_updateFieldSeen } from "../controller/noti.detail.controller";
import { controll_getAllNotifyFollowAccount } from "../controller/notification.controller";
import { controller_createGC, controller_deleteChat, controller_deleteGC, controller_getAllChatInGC, controller_getGCById, controller_getInfoChatMessage, controller_updateGC, controller_userSeenMessage } from "../controller/chat.realtime.controller";
import { upload } from "./app.route";


const adminRouter = express.Router();

//Notification
adminRouter.get('/notification/get-all', validateUserMiddleware() as any, controll_getAllNotifyFollowAccount);

//NotiDetail
adminRouter.put('/notification/detail/seen-true', validateUserMiddleware() as any, controll_updateFieldSeen);

//Chat Real-Time
adminRouter.get('/group-chat/get-by/:id', validateUserMiddleware() as any, controller_getGCById);
adminRouter.get('/chat/group-chat/:sinceday/:sender/:revicer/:grchatid', validateUserMiddleware() as any, controller_getAllChatInGC);
adminRouter.get('/chat/get-by/:idchat', validateUserMiddleware() as any, controller_getInfoChatMessage);
adminRouter.post('/group-chat/create', validateUserMiddleware() as any, upload.single('avatar'), controller_createGC);
adminRouter.post('/view/user-seend', validateUserMiddleware() as any, controller_userSeenMessage);
adminRouter.put('/group-chat/update', validateUserMiddleware() as any, upload.single('avatar'), controller_updateGC);
adminRouter.delete('/group-chat/delete/:id', validateUserMiddleware() as any, controller_deleteGC);
adminRouter.delete('/chat/delete/:id', validateUserMiddleware() as any, controller_deleteChat);

export default adminRouter;