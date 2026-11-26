import sequelize from "../config/database.js"
import { Juego, Usuario, Orden, DetalleOrden } from '../models/relaciones.js'

const juegos = [
  {
    id: 1,
    nombre: "Metal Gear Solid",
    plataforma: "PS1",
    descripcion: "La primera entrega en la reconocida saga de infiltración de Hideo Kojima.",
    precio: 99,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7w.png"
  },
  {
    id: 2,
    nombre: "Super Mario Bros.",
    plataforma: "NES",
    descripcion: "El clásico juego de plataformas que definió la era dorada de Nintendo.",
    precio: 75,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vzi.png"
  },
  {
    id: 3,
    nombre: "The Legend of Zelda: Ocarina of Time",
    plataforma: "Nintendo 64",
    descripcion: "Una obra maestra de la aventura en 3D que revolucionó la industria.",
    precio: 120,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1sp5.png"
  },
  {
    id: 4,
    nombre: "Castlevania: Symphony of the Night",
    plataforma: "PS1",
    descripcion: "El referente definitivo del género Metroidvania con un apartado artístico brillante.",
    precio: 110,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2not.png"
  },
  {
    id: 5,
    nombre: "Sonic the Hedgehog",
    plataforma: "Sega Genesis",
    descripcion: "La velocidad vertiginosa del erizo azul que compitió directamente con Nintendo.",
    precio: 60,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x8u.png"
  },
  {
    id: 6,
    nombre: "Resident Evil",
    plataforma: "PS1",
    descripcion: "El título que popularizó el género de los videojuegos de supervivencia y horror.",
    precio: 85,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1y5q.png"
  },
  {
    id: 7,
    nombre: "Final Fantasy VII",
    plataforma: "PS1",
    descripcion: "Un épico juego de rol japonés que marcó un antes y un después en la narrativa gráfica.",
    precio: 95,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dqy.png"
  },
  {
    id: 8,
    nombre: "Street Fighter II",
    plataforma: "Arcade",
    descripcion: "El juego de lucha competitivo que desató la fiebre de las arcadas en los años 90.",
    precio: 70,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2nov.png"
  },
  {
    id: 9,
    nombre: "Doom",
    plataforma: "PC",
    descripcion: "El padre de los disparos en primera persona (FPS) y un pilar de la cultura geek.",
    precio: 50,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vzp.png"
  },
  {
    id: 10,
    nombre: "Chrono Trigger",
    plataforma: "SNES",
    descripcion: "Una aventura de viajes en el tiempo considerada de los mejores JRPG de la historia.",
    precio: 130,
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1zgd.png"
  }
]

const usuarios = [
    { id: 1, usuario: 'admin', password: '123', rol: 'admin' },
    { id: 2, usuario: 'juan', password: '123', rol: 'usuario' }
];

const ordenes = [
    { id: 1, usuarioId: 2, total: 273, estado: 'PAGADA' },
    { id: 2, usuarioId: 2, total: 75, estado: 'PAGADA' }
];

const detallesOrden = [
    { id: 1, ordenId: 1, juegoId: 1, cantidad: 2, precio: 99 },
    { id: 2, ordenId: 1, juegoId: 2, cantidad: 1, precio: 75 },
    { id: 3, ordenId: 2, juegoId: 2, cantidad: 1, precio: 75 }
];

async function migrate() {
  try {
    await sequelize.sync({force: true})
    await Juego.bulkCreate(juegos);
    await Usuario.bulkCreate(usuarios);
    await Orden.bulkCreate(ordenes);
    await DetalleOrden.bulkCreate(detallesOrden);

    for (const tabla of ['juegos', 'usuarios', 'ordenes', 'detalles_orden']) {
      await sequelize.query(
      `SELECT setval(pg_get_serial_sequence('${tabla}', 'id'), (SELECT MAX(id) FROM ${tabla}))`
      )
    }

    console.log('Migracion terminada!')
  
  } catch (error) { 
    console.log(error)
  } finally {
    await sequelize.close()
  }
}

migrate();