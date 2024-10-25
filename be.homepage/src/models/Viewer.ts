import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Chat from "./Chat";
import Account from "./Account";

class Viewer extends Model {
    public id!: number;
    public idchat!: number;
    public viewby!: number;
    public readonly createdAt!: Date;
}

Viewer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idchat: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Chat',
                key: 'id'
            }
        },
        viewby: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Account',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Viewer',
        updatedAt: false,
        deletedAt: false,
        paranoid: false
    }
);

Chat.hasOne(Viewer, {
    foreignKey: 'idchat',
    as: 'viewers'
});
Viewer.belongsTo(Chat, {
    foreignKey: 'idchat',
    as: 'chats'
});

Account.hasMany(Viewer, {
    foreignKey: 'viewby',
    as: 'viewers'
});
Viewer.belongsTo(Account, {
    foreignKey: 'viewby',
    as: 'accounts'
});

export default Viewer;