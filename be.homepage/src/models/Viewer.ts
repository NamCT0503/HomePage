import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Chat from "./Chat";

class Viewer extends Model {
    public id!: number;
    public idchat!: number;
    public viewby!: string;
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
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'View',
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

export default Viewer;