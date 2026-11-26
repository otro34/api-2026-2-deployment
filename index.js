import app from './app.js'
import sequelize from './src/config/database.js';

let dbConnected = false;

async function ensureDatabaseConnection () {
  if (!dbConnected) {
    try {
      await sequelize.authenticate();
      console.log('Conexión a bd establecida correctamente');
      dbConnected = true;
    } catch(error) {
      console.log('error conectando a la base de datos', error);
      throw error;
    }
  }
}

async function main() {

  try {
      const init = process.argv[2];

      if (init) 
        await sequelize.sync({ force: true});
      else
        await sequelize.sync({ force: false}); 

      console.log('Base de datos sincronizada!')

      const PORT = process.env.PORT || 3005;

      app.listen(PORT, () => {
        console.log('Aplicación ejecutándose en el puerto ' + PORT);
      })
  } catch (error) {
    console.log(error)
  }

}

if (process.env.VERCEL) {
  app.use(async (req, res, next) => {
    await ensureDatabaseConnection();
    next;
  });
} else {
  main();
}

export default app;