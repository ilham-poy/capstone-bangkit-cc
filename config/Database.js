import { Sequelize } from "sequelize";
const db = new Sequelize(
    'nama-database', 
    'root',
    'password-database',
    {
    host: "public-ip-sql",
    dialect:"mysql"
})

export default db;