module.exports = {
    async up(queryInterface , Sequelize){
        await queryInterface.createTable('ContentApps', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            serapp_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'ServiceApps',
                    key: 'id'
                }
            },
            icon: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 'fa-solid fa-circle'
            },
            subtitle: {
                type: Sequelize.STRING,
                allowNull: false
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
        await queryInterface.dropTable('ContentApps');
    }
}