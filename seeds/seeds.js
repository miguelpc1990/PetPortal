const sequelize = require('../config/connection');
const { Dog, Kennel, Owner, User } = require('../models');
const dogData = require('./dog-seeds.json');
const ownerData = require('./owner-seeds.json');
const userData = require('./user-data.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const owners = await Owner.bulkCreate(ownerData, {
        returning: true,
    });

    const users = await User.bulkCreate(userData, {
        returning: true,
    });

    for (const dogs of dogData) {
        await Dog.create({
            ...dogs,
            owner_id: owners[Math.floor(Math.random() * owners.length)].id,
        });
    };
// still working on this... need to figure out how to only seed if dog is selected
//    for (const kennels of kennel)

    process.exit(0);
};

seedDatabase();