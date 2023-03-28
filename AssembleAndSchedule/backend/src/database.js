import { Sequelize } from "sequelize";
const assemdb = new Sequelize('postgres://postgres:andersencorp@localhost:5432/assem_sched') // Example for postgres

export default assemdb;
