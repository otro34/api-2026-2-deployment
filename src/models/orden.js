import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Orden = sequelize.define('orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PAGADA'
    }
}, {
    tableName: 'ordenes'
})

export default Orden;