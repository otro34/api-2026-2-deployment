import model from '../models/juego.js'
import RepositoryBase from '../repositories/RepositoryBase.js';

const repository = new RepositoryBase(model);

const findAll = async (req, resp) => {
  const respuesta = await repository.findAll();
  return sendResponse(respuesta, "No se encontró.", 404, resp);
}

const findOne = async (req,resp) => {
  const respuesta = await repository.findOne(req.params.id);

  return sendResponse(respuesta, "No se encontró.", 404, resp);
}

const create = async (req,resp) => {
  const payload = req.body;
  const respuesta = await repository.create(payload);

  return sendResponse(respuesta, "No se pudo crear.", 400, resp);
}

const update = async (req,resp) => {
  const payload = req.body;
  const respuesta = await repository.update(payload);

  return sendResponse(respuesta, "No se pudo crear.", 400, resp);
}

const remove = async (req,resp) => {
  const respuesta = await repository.remove(req.params.id);

  return sendResponse(respuesta, "No se encontró.", 404, resp);
}

const sendResponse = (respuesta, menssage, errorCode, resp) => {
  if (!respuesta)
    return resp.status(errorCode).json({ success:false, menssage })
  else
    return resp.status(200).json(respuesta);
}

const controller = { findAll, findOne, create, update, remove}

export default controller;
