module.exports = {
    async up(queryInterface , Sequelize){
        await queryInterface.createTable('NotiDetails', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            accountid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Accounts',
                    key: 'id'
                }
            },
            notiid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Notifications',
                    key: 'id'
                }
            },
            seen: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            dataChange: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    },
    
    async down(queryInterface , Sequelize){
        await queryInterface.dropTable('NotiDetails');
    }
}