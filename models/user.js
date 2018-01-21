// =============================================================
// Users table 
// =============================================================

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255],
            }
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true,
            }
        },
        profile_pic_link: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 500],
            }
        },
        user_karma_koins: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fb_user_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return User;
};