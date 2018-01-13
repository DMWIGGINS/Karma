// =============================================================
// Favors table 
// =============================================================

module.exports = function (sequelize, DataTypes) {
    var Favor = sequelize.define("favor", {
        favor_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255],  
            }
        },
        favor_asker_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        favor_completer_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        favor_status: {
            type: DataTypes.STRING,
            allowNull: false
            // validate: {
            //     len: [1] 
            // }
        },
        favor_karma_koin_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Favor;
};
