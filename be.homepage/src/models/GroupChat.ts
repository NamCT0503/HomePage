import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Account from "./Account";

class GroupChat extends Model{
    public id!: string;
    public name!: string;
    public avatar!: string;
    public leader!: string;
    public member!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
    public readonly deletedAt!: Date | null;
}

GroupChat.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '/default_image.jpg'
        },
        leader: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Account',
                key: 'id'
            }
        },
        member: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'GroupChat',
        timestamps: true,
        paranoid: true
    }
);

Account.hasMany(GroupChat, {
    foreignKey: 'leader',
    as: 'groupchats'
});
GroupChat.belongsTo(Account, {
    foreignKey: 'leader',
    as: 'accounts'
});

export default GroupChat;