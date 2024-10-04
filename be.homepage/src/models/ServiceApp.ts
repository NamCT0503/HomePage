import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ServiceApp extends Model{
    public id!: number;
    public type!: string;
    public title!: string;
    public subtitle!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;
}

ServiceApp.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'ServiceApp',
        timestamps: true,
        paranoid: true
    }
)

export default ServiceApp;