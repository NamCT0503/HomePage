import express from "express";
import { controll_getAccount, controller_changePassword, controller_deleteAccount, controller_signin, controller_signup, controller_updateAccount } from "../controller/account.controller";
import { signin } from "../service/account.services";
import validateUserMiddleware from "../middleware/validate.user.middleware";
import checkRoleAccount from "../middleware/check.role.middleware";
import { controller_createWebPackage, controller_deleteSerWebPackage, controller_getAllWebPackage, controller_updateSerWebPackage } from "../controller/serweb.controller";
import { controller_createContentWebPackage, controller_deleteContentWeb, controller_getContentWeb, controller_updateContentWeb } from "../controller/content.web.controller";
import { controller_createSerAppPackage, controller_deleteSerAppPackage, controller_getAllSerAppPackage, controller_updateSerAppPackage } from "../controller/serapp.controller";
import { controller_createContentApp, controller_deleteContentApp, controller_getContentApp, controller_updateContentApp } from "../controller/contentapp.controller";
import { controller_createBlogOverview, controller_deleteBlog, controller_getBlogs, controller_getOrtherBlogs, controller_updateBlog } from "../controller/blog.controller";
import multer from "multer";
import fs from "fs";
import path from "path";
import { Client } from "minio";
import * as dotenv from "dotenv";
import actionOneSelfMiddelware from "../middleware/action.oneself.middleware";
import { controller_createBlogContent, controller_deleteBlogContent, controller_getBlogContent, controller_updateBlogContent } from "../controller/blog.content.controller";

dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

//Account
router.get('/get-account/:id/:param', validateUserMiddleware() as any, checkRoleAccount() as any ,controll_getAccount);
router.post('/login', controller_signin);
router.post('/signup', validateUserMiddleware() as any, checkRoleAccount() as any, controller_signup);
router.put('/account/update-account', validateUserMiddleware() as any, controller_updateAccount)
router.put('/account/change-password', validateUserMiddleware() as any, controller_changePassword);
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
router.get('/service/blog/get-orther-blogs/:id/:page', controller_getOrtherBlogs);
router.post('/service/blog/create', validateUserMiddleware() as any, upload.single('img'), controller_createBlogOverview);
router.put('/service/blog/update', validateUserMiddleware() as any, upload.single('img'), actionOneSelfMiddelware() as any, controller_updateBlog);
router.delete('/service/blog/delete', validateUserMiddleware() as any, actionOneSelfMiddelware() as any, controller_deleteBlog);

//BlogContent
router.get('/service/blog/content/get/:blogid', controller_getBlogContent);
router.post('/service/blog/content/create', validateUserMiddleware() as any, upload.single('content'), controller_createBlogContent);
router.put('/service/blog/content/update', validateUserMiddleware() as any, upload.single('content'), actionOneSelfMiddelware() as any, controller_updateBlogContent);
router.delete('/service/blog/content/delete/:id/:scope', validateUserMiddleware() as any, actionOneSelfMiddelware() as any, controller_deleteBlogContent);

export default router;