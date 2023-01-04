const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Owner extends Model {}

Owner.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dogs: {
            type: DataTypes.INTEGER,
            references: {
                model: 'dog',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'owner',
    }
);

module.exports = Owner;