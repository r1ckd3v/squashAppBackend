const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Sets = sequelize.define(
    'Sets',
    {
      set_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      match_id: { type: DataTypes.INTEGER },
      set_number: { type: DataTypes.INTEGER, allowNull: false },
      player1_points: { type: DataTypes.INTEGER, allowNull: false },
      player2_points: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: 'Sets',
      timestamps: false,
    }
  );

  Sets.associate = (models) => {
    Sets.belongsTo(models.Matches, { foreignKey: 'match_id', as: 'match' });
  };

  return Sets;
};
