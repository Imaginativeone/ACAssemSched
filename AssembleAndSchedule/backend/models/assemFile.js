import assemdb from "../src/database.js";
import { Model, DataTypes } from "sequelize";

class AssemFile extends Model {}
AssemFile.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    filename: DataTypes.STRING,
    processed: DataTypes.BOOLEAN,
    owner: DataTypes.STRING,
    created_at: { type: DataTypes.DATE},
  },
  { sequelize: assemdb, modelName: "assemFile" }
);

export default AssemFile;
