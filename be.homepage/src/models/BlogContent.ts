import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Blog from "./Blog";

class BlogContent extends Model{
    public id!: number;
    public blogid!: number;
    public stt!: number;
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
        stt: {
            type: DataTypes.INTEGER,
            allowNull: false
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

Blog.hasMany(BlogContent, {
    foreignKey: 'blogid',
    as: 'blogcontents'
});

BlogContent.belongsTo(Blog, {
    foreignKey: 'blogid',
    as: 'blogs'
})

export default BlogContent;