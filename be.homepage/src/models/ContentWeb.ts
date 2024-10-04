import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ContentWeb extends Model{
    public id!: number;
    public serweb_id!: number;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;
}

ContentWeb.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        serweb_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ServiceWeb',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'ContentWeb',
        timestamps: true,
        paranoid: true
    }
)

export default ContentWeb;