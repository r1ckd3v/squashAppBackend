const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Users = sequelize.define(
    'Users',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      // store the bcrypt hash here
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      // optional roles array, e.g. ['admin']
      roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      tableName: 'Users',
      timestamps: false,
    }
  );

  return Users;
};
