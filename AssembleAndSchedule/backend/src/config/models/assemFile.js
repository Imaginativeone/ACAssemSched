import assemdb from "../../database.js";
import { Model, DataTypes } from "sequelize";

// console.log('assmdb', assemdb);

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
  { sequelize: assemdb, modelName: "AssemFile" }
);

(async () => {await assemdb.sync();
})();

export default AssemFile;
