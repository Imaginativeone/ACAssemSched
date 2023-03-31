import assemdb from "../src/database.js";
import AssemFile from "../models/assemFile.js";
import { Model, DataTypes } from "sequelize";

class AssemFileData extends Model {}
AssemFileData.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    file_id: {
      type: DataTypes.STRING,
      references: {
        model: "assemFile",
        key: "id",
      },
    },
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
  },
  { sequelize: assemdb, modelName: "assemFileData" }
);

AssemFile.hasMany(AssemFileData, { foreignKey: "id" });
AssemFileData.belongsTo(AssemFile, { onDelete: "CASCADE" });
export default AssemFileData;
