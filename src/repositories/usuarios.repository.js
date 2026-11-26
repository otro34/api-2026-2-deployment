import model from '../models/usuario.js'
import RepositoryBase from './RepositoryBase.js';

const repository = new RepositoryBase(model);

repository.findUser = async ({usuario, password}) => {
  try {
    return await model.findOne({
      where: {
        usuario: usuario,
        password: password
      }
    }) 

  } catch(err){
    console.log(err)
  }
}

export default repository;