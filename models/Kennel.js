const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Kennel extends Model{}

Kennel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        isTaken: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        dog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dog',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'kennel'
    }
);

module.exports = Kennel;