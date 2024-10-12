module.exports = {
    async up(queryInterface , Sequelize){
        await queryInterface.createTable('Notifications', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            actionid: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            type_noti: {
                type: Sequelize.ENUM('account', 'blog', 'web', 'app'),
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('new', 'update', 'delete'),
                allowNull: false
            },
            actionBy: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    
    async down(queryInterface , Sequelize){
        await queryInterface.dropTable('Notifications');
    }
}