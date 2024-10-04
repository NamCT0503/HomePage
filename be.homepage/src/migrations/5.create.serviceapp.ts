module.exports = {
    async up(queryInterface , Sequelize){
        await queryInterface.createTable('ServiceApps', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            subtitle: {
                type: Sequelize.STRING,
                allowNull: true
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
        });
    },
    
    async down(queryInterface , Sequelize){
        await queryInterface.dropTable('ServiceApps');
    }
}