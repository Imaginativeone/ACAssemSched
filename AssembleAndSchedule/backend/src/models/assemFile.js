import assemdb from "../database.js";
import {Model, DataTypes} from "sequelize"

// console.log('assmdb', assemdb);

class AssemFile extends Model {};
AssemFile.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    filename: DataTypes.STRING,  
    processed: DataTypes.BOOLEAN,
    owner: DataTypes.STRING,
    created_at: DataTypes.TIME, 

}, {sequelize: assemdb, modelName: 'assemFile' });

(async () => {
    await assemdb.sync();
})();

export default AssemFile;