import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

import juegosRouter from './src/routes/juegos.routes.js'
import usuariosRouter from './src/routes/usuarios.routes.js'
import ordenesRouter from './src/routes/ordenes.routes.js'

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, resp) => {
  return resp.json({ message: "HEALTHY", code: 200})
})

app.use('/juegos', juegosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ordenes', ordenesRouter);


export default app;