module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('Chats', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            grchatid: {
                type: Sequelize.STRING,
                allowNull: true,
                references: {
                    model: 'GroupChats',
                    key: 'id'
                }
            },
            sender: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Accounts',
                    key: 'id'
                }
            },
            revicer: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Accounts',
                    key: 'id'
                }
            },
            message: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('sending', 'sent', 'reviced', 'seen'),
                allowNull: false,
                defaultValue: 'sending'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        })
    },

    async down(queryInterface, Sequelize){
        await queryInterface.dropTable('Chats');
    }
}