import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import GroupChat from "./GroupChat";

class Chat extends Model{
    public id!: number;
    public grchatid!: string;
    public sender!: number;
    public revicer!: number;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date | null;
}

Chat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        grchatid: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'GroupChat',
                key: 'id'
            }
        },
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        revicer: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('sending', 'sent', 'reviced', 'seen'),
            allowNull: false,
            defaultValue: 'sending'
        }
    },
    {
        sequelize,
        modelName: 'Chat',
        timestamps: true,
        deletedAt: false,
        paranoid: false
    }
);

GroupChat.hasMany(Chat, {
    foreignKey: 'grchatid',
    as: 'chats'
});
Chat.belongsTo(GroupChat, {
    foreignKey: 'grchatid',
    as: 'groupchats'
});

export default Chat;