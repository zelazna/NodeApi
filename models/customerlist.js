"use strict";

module.exports = function (sequelize, DataTypes) {
  var CustomerList = sequelize.define('CustomerList', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    nationalite: { type: DataTypes.STRING, allowNull: false },
    mail: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'PENDING' }
  });
  return CustomerList;
};
