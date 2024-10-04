module.exports = {
    async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Accounts', [
        {
        fullname: 'Nguyen Van A',
        username: 'nguyenvana',
        password: '123456',
        email: null,
        role: 'superadmin',
        createdAt: getTimeLocal()
        },
        {
        fullname: 'Trinh Van A',
        username: 'admin1',
        password: 'admin1',
        email: null,
        role: 'admin',
        createdAt: getTimeLocal()
        }
    ], {});
    },

    async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {});
    }
};

function getTimeLocal(){
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
}