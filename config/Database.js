import { Sequelize } from "sequelize";
const db = new Sequelize(
    'my_database', 
    'root',
    '',
    {
    host: "localhost",
    dialect:"mysql"
})

export default db;