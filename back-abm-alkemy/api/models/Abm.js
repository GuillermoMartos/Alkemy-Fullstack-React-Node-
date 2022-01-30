const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "abm",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false
      },
      concept: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("in", "out"),
        allowNull: false,
      },
      category:{
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    { timestamps: true, createdAt: true, updatedAt: true }
  );
};
