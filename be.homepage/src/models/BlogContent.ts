import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class BlogContent extends Model{
    public id!: number;
    public blogid!: number;
    public type_content!: string;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;
}

BlogContent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        blogid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Blog',
                key: 'id'
            }
        },
        type_content: {
            type: DataTypes.ENUM('text', 'textol', 'textul', 'heading', 'image'),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'BlogContent',
        timestamps: true,
        paranoid: true
    }
)

export default BlogContent;