import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Account extends Model{
    public id!: number;
    public fullname!: string;
    public username!: string;
    public password!: string;
    public avatar!: string;
    public email!: string;
    public role!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;
}

Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '/default_image.jpg'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('admin', 'superadmin')
        }
    },
    {
        sequelize,
        modelName: 'Account',
        timestamps: true,
        paranoid: true
    }
)

export default Account;