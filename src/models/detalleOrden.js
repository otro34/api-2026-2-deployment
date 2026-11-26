import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const DetalleOrden = sequelize.define('detalle_orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'detalles_orden'
})

export default DetalleOrden;