module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users',
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })

  return Users
}
