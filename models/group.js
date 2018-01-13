// =============================================================
// Groups table 
// =============================================================

module.exports = function (sequelize, DataTypes) {
    var Group = sequelize.define("group", {
        group_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255],  
            }
        },
        group_leader: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255],  
            }
        }
    });
    return Group;
};
