import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Account from "./Account";
import Blog from "./Blog";
import ServiceWeb from "./ServiceWeb";
import ServiceApp from "./ServiceApp";

class Notification extends Model{
    public id!: number;
    public actionid!: number;
    public type_noti!: string;
    public status!: string;
    public actionBy!: number;
    public readonly createdAt!: Date;
}

Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        actionid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type_noti: {
            type: DataTypes.ENUM('account', 'blog', 'web', 'app'),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('new', 'update', 'delete'),
            allowNull: false
        },
        actionBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'Notification',
        timestamps: true,
        updatedAt: false,
        deletedAt: false,
        // paranoid: true
    }
);

Account.hasMany(Notification, {
    foreignKey: 'actionid',
    as: 'notifications'
});
Notification.belongsTo(Account, { 
    foreignKey: 'actionid', 
    constraints: false, 
    scope: { type_noti: 'account' } 
});

Blog.hasMany(Notification, {
    foreignKey: 'actionid',
    as: 'notifications'
});
Notification.belongsTo(Blog, { 
    foreignKey: 'actionid', 
    constraints: false, 
    scope: { type_noti: 'blog' } 
});

ServiceWeb.hasMany(Notification, {
    foreignKey: 'actionid',
    as: 'notifications'
});
Notification.belongsTo(ServiceWeb, { 
    foreignKey: 'actionid', 
    constraints: false, 
    scope: { type_noti: 'web' } 
});

ServiceApp.hasMany(Notification, {
    foreignKey: 'actionid',
    as: 'notifications'
});
Notification.belongsTo(ServiceApp, { 
    foreignKey: 'actionid', 
    constraints: false, 
    scope: { type_noti: 'app' } 
});

export default Notification;