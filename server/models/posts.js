module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Definiši sve asocijacije u jednoj funkciji
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      foreignKey: "PostId", // Ovdje postavi strani ključ
      onDelete: "CASCADE",
    });

    Posts.hasMany(models.Likes, {
      foreignKey: "PostId", // Ovdje postavi strani ključ
      onDelete: "CASCADE",
    });
  };

  return Posts;
};
