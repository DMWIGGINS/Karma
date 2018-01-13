// =============================================================
// Users table 
// =============================================================

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("user", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255],  
            }
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        favors_asked_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        favors_completed_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_karma_koins: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
    return User;
};
