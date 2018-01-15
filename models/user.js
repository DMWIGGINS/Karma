// =============================================================
// Users table 
// =============================================================

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255],  
            }
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        // group_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // favors_asked_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        // favors_completed_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        user_karma_koins: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
    User.associate = function(models) {
        // Associating User with Favors
        // When a User is deleted, also delete any associated Favors
        User.hasMany(models.Favor, {
          onDelete: "cascade"
        });
      };
      User.associate = function(models) {
        // We're saying that a User should belong to an Group
        // A User can't be created without a Group due to the foreign key constraint
        User.belongsTo(models.Group, {
          foreignKey: {
            allowNull: true
          }
        });
      };
    return User;
};
