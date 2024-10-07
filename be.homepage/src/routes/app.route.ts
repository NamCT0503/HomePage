import express from "express";
import { controll_getAccount, controller_deleteAccount, controller_signin, controller_signup, controller_updateAccount } from "../controller/account.controller";
import { signin } from "../service/account.services";
import validateUserMiddleware from "../middleware/validate.user.middleware";
import checkRoleAccount from "../middleware/check.role.middleware";
import { controller_createWebPackage, controller_deleteSerWebPackage, controller_getAllWebPackage, controller_updateSerWebPackage } from "../controller/serweb.controller";
import { controller_createContentWebPackage, controller_deleteContentWeb, controller_getContentWeb, controller_updateContentWeb } from "../controller/content.web.controller";
import { controller_createSerAppPackage, controller_deleteSerAppPackage, controller_getAllSerAppPackage, controller_updateSerAppPackage } from "../controller/serapp.controller";
import { controller_createContentApp, controller_deleteContentApp, controller_getContentApp, controller_updateContentApp } from "../controller/contentapp.controller";

const router = express.Router();

//Account
router.get('/get-account', validateUserMiddleware() as any, checkRoleAccount() as any ,controll_getAccount);
router.post('/login', controller_signin);
router.post('/signup', validateUserMiddleware() as any, checkRoleAccount() as any, controller_signup);
router.put('/account/update-account', validateUserMiddleware() as any, controller_updateAccount)
router.delete('/account/delete-account', validateUserMiddleware() as any, checkRoleAccount() as any, controller_deleteAccount);

//ServiceWeb
router.get('/service/web/getall', validateUserMiddleware() as any, controller_getAllWebPackage);
router.post('/service/web/create', validateUserMiddleware() as any, controller_createWebPackage);
router.put('/service/web/upate', validateUserMiddleware() as any, controller_updateSerWebPackage);
router.delete('/service/web/delete', validateUserMiddleware() as any, controller_deleteSerWebPackage);

//ContentWeb
router.get('/service/web/get-content/:id/:ref', controller_getContentWeb);
router.post('/service/web/content/create', validateUserMiddleware() as any, controller_createContentWebPackage);
router.put('/service/web/content/update', validateUserMiddleware() as any, controller_updateContentWeb);
router.delete('/service/web/content/delete', validateUserMiddleware() as any, controller_deleteContentWeb);


//ServiceApp
router.get('/service/app/get-all', validateUserMiddleware() as any, controller_getAllSerAppPackage);
router.post('/service/app/create', validateUserMiddleware() as any, controller_createSerAppPackage);
router.put('/service/app/update', validateUserMiddleware() as any, controller_updateSerAppPackage);
router.delete('/service/app/delete', validateUserMiddleware() as any, controller_deleteSerAppPackage);

//ContentApp
router.get('/service/app/get-content/:id/:ref', controller_getContentApp);
router.post('/service/app/content/create', validateUserMiddleware() as any, controller_createContentApp);
router.put('/service/app/content/update', validateUserMiddleware() as any, controller_updateContentApp);
router.delete('/service/app/content/delete', validateUserMiddleware() as any, controller_deleteContentApp);

export default router;