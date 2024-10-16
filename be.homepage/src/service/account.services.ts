import jwt from "jsonwebtoken";
import  * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import db from "../models";
import { Op, where } from "sequelize";
import { AccountEntity, NotiDetailEntity, NotificationEntity } from "../entities/app.entity";
import { createNoti } from "./notification.services";

//Superadmin được phép lấy ra danh sách tài khoản hoặc tìm kiếm tài khoản
//Admin chỉ được phép lấy ra thông tin tài khoản của mình
export const getAccount = async (param: string | number, idMyOwn: any) => {
    try {
        let result: any;
        if((param && param !==':param') && (!idMyOwn && idMyOwn !== ':id')){
            const conditions = `%${param}%`
            const searchConditions = {
                [Op.or]: [
                    { id: { [Op.like]: conditions }},
                    { username: { [Op.like]: conditions }},
                    { email: { [Op.like]: conditions }},
                    { role: { [Op.like]: param }}
                ]
            }
            result = await db.Account.findAll({ where: searchConditions });
        } else {
            if(idMyOwn){
                result = await db.Account.findByPk(idMyOwn);
            } else {
                result = await db.Account.findAll();
            }
        }

        return result;
    } catch (error) {
        console.error('=== In getAccount: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const signin = async (username: string, password: string) => {
    try {
        if(!username || !password) return{ status: '400', message: 'DataInput Invalid!'}

        const userExisted = await db.Account.findOne({
            where: { username: username }
        });

        if(!userExisted){
            console.log('NotFound Account Matching DataInput!');
            return{ status: 400, message: 'NotFound Account Matching DataInput!'}
        }

        let payload: {username: string, sub: number, role: string};
        if(
            (userExisted.username == 'nguyenvana' 
                || userExisted.username == 'admin1'
            ) 
            && userExisted.password === password
        ){
            payload = {
                username: userExisted.username,
                sub: userExisted.id,
                role: userExisted.role
            }
        } else { 
            if(!await bcrypt.compare(password, userExisted.password)){
                return{
                    status: 400,
                    message: 'Thông tin đăng nhập không thành công!'
                }
            }

            payload = {
                username: userExisted.username,
                sub: userExisted.id,
                role: userExisted.role
            }
        }

        return{ 
            role: payload.role,
            sub: payload.sub,
            accessToken: jwt.sign(
                payload!, 
                process.env.JWT_SECRET as string, 
                { expiresIn: '1d'}
            )
        }
    } catch (error) {
        console.error('=== In signin: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const signup = async (data: AccountEntity, sub: number) => {
    try {
        if(
            !data || data === null ||
            !data.fullname || !data.username ||
            !data.password || !data.role
        ) 
            return{ status: 400, message: 'DataInput Invalid!'};

        const formatAccount = {
            fullname: data.fullname,
            username: data.username,
            password: await hashPassword(data.password),
            email: data.email? data.email: null,
            role: data.role
        }
        const newAccount = await db.Account.create(formatAccount);

        const formatNoti: NotificationEntity = {
            actionid: newAccount.id,
            type_noti: 'account',
            status: 'new',
            actionBy: sub
        }
        const formatDataChange = {
            fullname: data.fullname,
            username: data.username,
            email: data.email? data.email: null,
            role: data.role
        }
        await createNoti(formatNoti, formatDataChange);

        return{ status: 200, message: 'Created Successfully!'};
    } catch (error) {
        console.error('=== In signup: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

//Chỉ được phép sửa thông tin tài khoản của mình (dù là admin hay superadmin)
export const upateAccount = async (data: Partial<AccountEntity>, payload: any) => {
    try {
        const userExisted = await db.Account.findByPk(payload.sub);
        if(!userExisted) return{ status: 400, message: 'NotFound Account'};
        if(userExisted.username !== payload.username) return{ status: 400, message: 'Confirm Info Incorrect!'};

        const formatAccount = {
            fullname: data.fullname? data.fullname: userExisted.fullname,
            username: data.username? data.username: userExisted.username,
            password: data.password? await hashPassword(data.password): userExisted.password,
        }

        await db.Account.update(formatAccount,{
            where: { id: userExisted.id}
        });

        const formatNoti: NotificationEntity = {
            actionid: userExisted.id,
            type_noti: 'account',
            status: 'update',
            actionBy: payload.sub
        }
        await createNoti(formatNoti, data);

        return{ status: 200, message: 'Updated Successfully!'};
    } catch (error) {
        console.error('=== In updateAccount: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const changePassword = async (oldpass: string, newpass: string, sub: number) => {
    try {
        if(
            (!oldpass || oldpass === '') ||
            (!newpass || newpass === '')
        ) return{ status: 400, message: "DataInput Invalid!"}

        const accountExisted = await db.Account.findByPk(sub);
        if(!accountExisted) return{ status: 400, message: "Account Not Exist!"};

        if(!await bcrypt.compare(oldpass, accountExisted.password)){
            return{
                status: 400,
                message: 'Old Password Incorrect!'
            }
        }

        const newPwd = await hashPassword(newpass);
        await db.Account.update({
            password: newPwd
        }, {
            where: { id: sub}
        });

        return{ status: 200, message: "Change Password Successfully!"};
    } catch (error) {
        console.error('=== In changePassword: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

//Admin chỉ được phép xóa tài khoản của mình
//Superadmin được phép xóa tất cả tài khoản
export const deleteAccount = async (id: number, isMyOwn: any) => {
    try {
        if(id && isMyOwn.role === 'superadmin'){
            await db.Account.destroy({ where: { id: id}});

            const formatNoti: NotificationEntity = {
                actionid: id,
                type_noti: 'account',
                status: 'delete',
                actionBy: isMyOwn.sub
            }
            await createNoti(formatNoti);
        } else {
            await db.Account.destroy({ where: { id: isMyOwn.sub}});

            const formatNoti: NotificationEntity = {
                actionid: isMyOwn.sub,
                type_noti: 'account',
                status: 'delete',
                actionBy: isMyOwn.sub
            }
            await createNoti(formatNoti);
        }

        return{ status: 200, message: "Deleted Sucessfully!"};
    } catch (error) {
        console.error('=== In deleteAccount: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}