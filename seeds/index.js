const sequelize = require('./dog-seeds.json');
const Dogs = require('../models/Dogs');
const dogData = require('./dog-seeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Dogs.bulkcreate(dogData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();