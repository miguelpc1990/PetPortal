const Dog = require('./Dog');
const Kennel = require('./Kennel');
const Owner = require('./Owner');

Owner.hasMany(Dog, {
    foreignKey: 'owner_id',
    onDelete: 'CASCADE',
});

Dog.belongsTo(Owner, {
    foreignKey: 'owner_id',
});

Kennel.hasOne(Dog, {
    foreignKey: 'dog_id'
});

module.exports = { Dog, Owner, Kennel };


