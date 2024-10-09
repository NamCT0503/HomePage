import express from "express";
import { controll_getAccount, controller_deleteAccount, controller_signin, controller_signup, controller_updateAccount } from "../controller/account.controller";
import { signin } from "../service/account.services";
import validateUserMiddleware from "../middleware/validate.user.middleware";
import checkRoleAccount from "../middleware/check.role.middleware";
import { controller_createWebPackage, controller_deleteSerWebPackage, controller_getAllWebPackage, controller_updateSerWebPackage } from "../controller/serweb.controller";
import { controller_createContentWebPackage, controller_deleteContentWeb, controller_getContentWeb, controller_updateContentWeb } from "../controller/content.web.controller";
import { controller_createSerAppPackage, controller_deleteSerAppPackage, controller_getAllSerAppPackage, controller_updateSerAppPackage } from "../controller/serapp.controller";
import { controller_createContentApp, controller_deleteContentApp, controller_getContentApp, controller_updateContentApp } from "../controller/contentapp.controller";
import { controller_createBlogOverview, controller_deleteBlog, controller_getBlogs, controller_updateBlog } from "../controller/blog.controller";
import multer from "multer";
import fs from "fs";
import path from "path";
import { Client } from "minio";
import * as dotenv from "dotenv";
import actionOneSelfMiddelware from "../middleware/action.oneself.middleware";

dotenv.config();

const router = express.Router();

export const minioClient = new Client({
    endPoint: process.env.MinIO_ENDPOINT as string,
    port: parseInt(process.env.MinIO_PORT as string),
    useSSL: false,
    accessKey: process.env.MinIO_USERNAME as string,
    secretKey: process.env.MinIO_PASSWORD as string,
});

const upload = multer({ storage: multer.memoryStorage() });

//Account
router.get('/get-account', validateUserMiddleware() as any, checkRoleAccount() as any ,controll_getAccount);
router.post('/login', controller_signin);
router.post('/signup', validateUserMiddleware() as any, checkRoleAccount() as any, controller_signup);
router.put('/account/update-account', validateUserMiddleware() as any, controller_updateAccount)
router.delete('/account/delete-account', validateUserMiddleware() as any, checkRoleAccount() as any, controller_deleteAccount);

//ServiceWeb
router.get('/service/web/getall', controller_getAllWebPackage);
router.post('/service/web/create', validateUserMiddleware() as any, controller_createWebPackage);
router.put('/service/web/upate', validateUserMiddleware() as any, controller_updateSerWebPackage);
router.delete('/service/web/delete', validateUserMiddleware() as any, controller_deleteSerWebPackage);

//ContentWeb
router.get('/service/web/get-content/:id/:ref', controller_getContentWeb);
router.post('/service/web/content/create', validateUserMiddleware() as any, controller_createContentWebPackage);
router.put('/service/web/content/update', validateUserMiddleware() as any, controller_updateContentWeb);
router.delete('/service/web/content/delete', validateUserMiddleware() as any, controller_deleteContentWeb);


//ServiceApp
router.get('/service/app/get-all', controller_getAllSerAppPackage);
router.post('/service/app/create', validateUserMiddleware() as any, controller_createSerAppPackage);
router.put('/service/app/update', validateUserMiddleware() as any, controller_updateSerAppPackage);
router.delete('/service/app/delete', validateUserMiddleware() as any, controller_deleteSerAppPackage);

//ContentApp
router.get('/service/app/get-content/:id/:ref', controller_getContentApp);
router.post('/service/app/content/create', validateUserMiddleware() as any, controller_createContentApp);
router.put('/service/app/content/update', validateUserMiddleware() as any, controller_updateContentApp);
router.delete('/service/app/content/delete', validateUserMiddleware() as any, controller_deleteContentApp);

//Blog
router.get('/service/blog/get-blogs/:filter/:page', controller_getBlogs);
router.post('/service/blog/create', validateUserMiddleware() as any, upload.single('img'), controller_createBlogOverview);
router.put('/service/blog/update', validateUserMiddleware() as any, upload.single('img'), actionOneSelfMiddelware() as any, controller_updateBlog);
router.delete('/service/blog/delete', validateUserMiddleware() as any, actionOneSelfMiddelware() as any, controller_deleteBlog);

export default router;