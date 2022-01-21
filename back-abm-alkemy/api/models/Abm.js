const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "abm",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      concept: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("in", "out"),
        allowNull: false,
      },
    },
    { timestamps: true, createdAt: true, updatedAt: true }
  );
};
