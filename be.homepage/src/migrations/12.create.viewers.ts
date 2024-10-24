module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('Viewers', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idchat: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Chats',
                    key: 'id'
                }
            },
            viewby: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        })
    },

    async down(queryInterface, Sequelize){
        await queryInterface.dropTable('Viewers');
    }
}