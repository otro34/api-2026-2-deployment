import sequelize from "../config/database.js";
import { DataTypes } from 'sequelize';

const Juego = sequelize.define('juego', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plataforma: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Juego;