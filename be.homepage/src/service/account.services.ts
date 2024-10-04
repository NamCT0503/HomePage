import jwt from "jsonwebtoken";
import  * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import db from "../models";
import { Op, where } from "sequelize";
import { AccountEntity } from "../entities/app.entity";

export const getAccount = async (param: string | number) => {
    try {
        let result: any;
        if(param){
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
            result = await db.Account.findAll();
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

        return{ accessToken: jwt.sign(
            payload!, 
            process.env.JWT_SECRET as string, 
            { expiresIn: '1d'}
        )}
    } catch (error) {
        console.error('=== In signin: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const signup = async (data: AccountEntity) => {
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

        await db.Account.create(formatAccount);
        return{ status: 200, message: 'Created Successfully!'};
    } catch (error) {
        console.error('=== In signup: '+error);
        return{
            status: 500,
            messgae: error
        }
    }
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}