import usuariosRepository from '../repositories/usuarios.repository.js'

const login = async ({ usuario, password}) => {
  const usr = await usuariosRepository.findUser({usuario, password});
  return usr;
}

const service = { login }

export default service;