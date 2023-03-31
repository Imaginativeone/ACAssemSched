'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assemFileData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assemFileData.init({
    file_id: DataTypes.STRING,
    proj_no: DataTypes.STRING,
    customized_item: DataTypes.STRING,
    upd_grp: DataTypes.STRING,
    upd_seq: DataTypes.STRING,
    int_ext: DataTypes.STRING,
    grille_type: DataTypes.STRING,
    plan_fin_dt: DataTypes.STRING,
    grille: DataTypes.STRING,
    sort1: DataTypes.STRING,
    sort2: DataTypes.STRING,
    sort3: DataTypes.STRING,
    sort4: DataTypes.STRING,
    sort5: DataTypes.STRING,
    sort6: DataTypes.STRING,
    feat1: DataTypes.STRING,
    feat2: DataTypes.STRING,
    feat3: DataTypes.STRING,
    feat4: DataTypes.STRING,
    feat5: DataTypes.STRING,
    feat6: DataTypes.STRING,
    feat7: DataTypes.STRING,
    lino: DataTypes.STRING,
    prp_qty: DataTypes.STRING,
    color_type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'assemFileData',
  });
  return assemFileData;
};