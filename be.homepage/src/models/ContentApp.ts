import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ServiceApp from "./ServiceApp";

class ContentApp extends Model{
    public id!: number;
    public serapp_id!: number;
    public icon!: string;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;
}

ContentApp.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        serapp_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ServiceApp',
                key: 'id'
            }
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'fa-solid fa-circle'
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'ContentApp',
        timestamps: true,
        paranoid: true
    }
)

ServiceApp.hasMany(ContentApp, {
    foreignKey: 'serapp_id',
    as: 'contentapps'
});

ContentApp.belongsTo(ServiceApp, {
    foreignKey: 'serapp_id',
    as: 'serviceapps'
});

export default ContentApp;