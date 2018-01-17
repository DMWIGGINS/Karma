// =============================================================
// Favors table 
// =============================================================

module.exports = function (sequelize, DataTypes) {
    var Favor = sequelize.define("Favor", {
        favor_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,255],  
            }
        },
        favor_desc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,1000],  
            }
        },
        favor_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        favor_time: {
            type: DataTypes.TIME,
            allowNull: true,
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
        favor_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Favor.associate = function(models) {
        // We're saying that a Favor should belong to a Group
        // A Favor can't be created without a Group due to the foreign key constraint
        Favor.belongsTo(models.Group, {
          foreignKey: {
            allowNull: true
          }
        });
      };
    return Favor;
};
