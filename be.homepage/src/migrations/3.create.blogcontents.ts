module.exports = {
    async up(queryInterface , Sequelize){
        await queryInterface.createTable('BlogContents', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            blogid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Blogs',
                    key: 'id'
                }
            },
            type_content: {
                type: Sequelize.ENUM('text', 'textol', 'textul', 'heading', 'image'),
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('BlogContents');
    }
}