// =============================================================
// Groups table 
//not being used
// =============================================================

module.exports = function (sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
        group_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255],
            }
        },
        group_leader: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255],
            }
        }
    });
    // Group.associate = function(models) {
    // Associating Group with Users
    // When a Group is deleted, also delete any associated Users
    //     Group.hasMany(models.User, {
    //       onDelete: "cascade"
    //     });
    //   };
    return Group;
};