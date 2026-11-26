import Sequelize from 'sequelize'
import pg from 'pg'

const hostname = 'localhost'; //127.0.0.1
const username = 'postgres';
const password = 'pg4dm1n$'; // 
const database = 'marcasdb0';
const port = 5432;
const dialect = 'postgres';

const url = process.env.DATABASE_URL;

const sequelize = url ? new Sequelize(url, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: { require: true, rejectUnathorized: false }
  },
  pool: { max: 2}
}) : new Sequelize(database, username, password, {
  host: hostname,
  port,
  dialect,
  dialectModule: pg
});

export default sequelize;