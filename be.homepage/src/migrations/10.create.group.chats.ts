module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('GroupChats', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: '/default_image.jpg'
            },
            leader: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Accounts',
                    key: 'id'
                }
            },
            member: {
                type: Sequelize.STRING
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        })
    },

    async down(queryInterface, Sequelize){
        await queryInterface.dropTable('GroupChats');
    }
}