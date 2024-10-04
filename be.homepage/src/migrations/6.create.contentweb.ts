module.exports = {
    async up(queryInterface , Sequelize){
        await queryInterface.createTable('ContentWebs', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            serweb_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'ServiceWebs',
                    key: 'id'
                }
            },
            content: {
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
        await queryInterface.dropTable('ContentWebs');
    }
}