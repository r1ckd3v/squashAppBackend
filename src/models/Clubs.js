const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Clubs = sequelize.define(
    'Clubs',
    {
      club_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      city: DataTypes.STRING(100),
      country: DataTypes.STRING(50),
      foundation_date: DataTypes.DATEONLY,
      email: DataTypes.STRING(100),
      phone: DataTypes.STRING(20),
    },
    {
      tableName: 'Clubs',
      timestamps: false,
    }
  );

  return Clubs;
};
