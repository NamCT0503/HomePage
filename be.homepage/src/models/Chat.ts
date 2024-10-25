import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import GroupChat from "./GroupChat";
import Account from "./Account";

class Chat extends Model{
    public id!: number;
    public grchatid!: string;
    public sender!: number;
    public revicer!: number;
    public message!: string;
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
            allowNull: false,
            references: {
                model: 'Account',
                key: 'id'
            }
        },
        revicer: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Account',
                key: 'id'
            }
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
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

Account.hasMany(Chat, {
    foreignKey: 'sender',
    as: 'usersend'
});
Account.hasMany(Chat, {
    foreignKey: 'revicer',
    as: 'userrevice'
});
Chat.belongsTo(Account, {
    foreignKey: 'sender',
    as: 'sentmessage'
});
Chat.belongsTo(Account, {
    foreignKey: 'revicer',
    as: 'revicedmessage'
});

export default Chat;