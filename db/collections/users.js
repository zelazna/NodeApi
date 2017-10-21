module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users',
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

  return users
}
