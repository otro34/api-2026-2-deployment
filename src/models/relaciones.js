import Usuario from './usuario.js';
import Juego from './juego.js';
import Orden from './orden.js';
import DetalleOrden from './detalleOrden.js';

// usuarios 1 ----> N ordenes 1 ----> N detalles_orden N -----> 1 juegos

Usuario.hasMany(Orden, { foreignKey: 'usuarioId'});
Orden.belongsTo(Usuario, { foreignKey: 'usuarioId'});

Orden.hasMany(DetalleOrden, { foreignKey: 'ordenId', as: 'detalles', onDelete: 'CASCADE'});
DetalleOrden.belongsTo(Orden, { foreignKey: 'ordenId'});

Juego.hasMany(DetalleOrden, {foreignKey: 'juegoId'});
DetalleOrden.belongsTo(Juego, { foreignKey: 'juegoId'});


export { Usuario, Juego, Orden, DetalleOrden}