module.exports = (sequalize, DataTypes) => {
  const Users = sequalize.define("Users", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };
  return Users;
};
