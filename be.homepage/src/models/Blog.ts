import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Blog extends Model{
    public id!: number;
    public img!: string;
    public title!: string;
    public description!: string;
    public postedAt!: Date;
    public postedBy!: number;
    public tag!: string;
    public isOutstanding!: boolean;
    public view!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;
}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        img: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '/image/blog-all-outstanding.png'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        postedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Account',
                key: 'id'
            }
        },
        tag: {
            type: DataTypes.ENUM('website', 'mobile'),
            allowNull: true,
            defaultValue: 'website'
        },
        isOutstanding: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        view: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Blog',
        timestamps: true,
        paranoid: true
    }
)

export default Blog;