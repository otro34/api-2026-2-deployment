import sequelize from '../config/database.js';
import { Orden, DetalleOrden, Juego, Usuario } from '../models/relaciones.js';
import RepositoryBase from './RepositoryBase.js';

const repository = new RepositoryBase(Orden);

const includeCompleto = [
    { model: Usuario, attributes: ['id', 'usuario']},
    { model: DetalleOrden, 
        as: 'detalles',
        include: [{ model: Juego, attributes: ['id', 'nombre', 'plataforma', 'img']}]
     }
]

repository.findAll = async () => {
    try {
        return await Orden.findAll({
            include: includeCompleto,
            order: ['id']
        })
    } catch (err) {
        console.log(err);
        return null;        
    }
}

repository.findOne = async (id) => {
  try {
    return await Orden.findOne({
      where: { id: id },
      include: includeCompleto
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

repository.findByUsuario = async (usuarioId) => {
  try {
    return await Orden.findAll({
      where: { usuarioId: usuarioId },
      include: includeCompleto,
      order: [['id']]
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

repository.createConDetalles = async ({ usuarioId, items}) => {
    try {
        const ordenId = await sequelize.transaction( async (t) => {
            let total = 0;
            const detalles = [];

            for (const item of items) {
                const juego = await Juego.findByPk(item.juegoId, { transaction: t});
                if (!juego)
                    throw new Error(`No existe el juego, id: ${item.juegoId}`)

                const precio = Number(juego.precio);
                total += precio * item.cantidad;
                detalles.push({ juegoId: item.juegoId, cantidad: item.cantidad, precio});
            }

            const orden = await Orden.create({ usuarioId, total}, { transacion: t});

            await DetalleOrden.bulkCreate(detalles.map(d =>({...d, ordenId: orden.id})), { transaction: t})

            return orden.id;
        });

        return await repository.findOne(ordenId);
    } catch (error) {
        console.log(error)
        return null;
    }
}

export default repository;