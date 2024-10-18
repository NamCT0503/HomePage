module.exports = {
    async up(queryInterface , Sequelize){
        await queryInterface.createTable('Blogs', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            img: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: '/blog-all-outstanding.png'
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
            },
            postedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            postedBy: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Accounts',
                    key: 'id'
                }
            },
            tag: {
                type: Sequelize.ENUM('website', 'mobile'),
                allowNull: true,
                defaultValue: 'website'
            },
            isOutstanding: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            view: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
        await queryInterface.dropTable('Blogs');
    }
}