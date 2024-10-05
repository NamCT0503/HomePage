import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ServiceWeb extends Model{
    public id!: number;
    public title!: string;
    public price!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;
}

ServiceWeb.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'ServiceWeb',
        timestamps: true,
        paranoid: true
    }
)

export default ServiceWeb;