import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Account from "./Account";
import Notification from "./Notification";

class NotiDetail extends Model{
    public id!: number;
    public accountid!: number;
    public notiid!: number;
    public seen!: boolean;
    public dataChange!: string;
}

NotiDetail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accountid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Account',
                key: 'id'
            }
        },
        notiid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Notification',
                key: 'id'
            }
        },
        seen: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        dataChange: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
      sequelize,
      modelName: 'NotiDetail',
      timestamps: false,
    //   paranoid: true  
    }
);

Account.hasMany(NotiDetail, {
    foreignKey: 'accountid',
    as: 'notidetails'
});
NotiDetail.belongsTo(Account, {
    foreignKey: 'accountid',
    as: 'accounts'
});

Notification.hasMany(NotiDetail, {
    foreignKey: 'notiid',
    as: 'notidetails'
});
NotiDetail.belongsTo(Notification, {
    foreignKey: 'notiid',
    as: 'notifications'
});

export default NotiDetail;