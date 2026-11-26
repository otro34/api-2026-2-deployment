import repository from "../repositories/ordenes.repository.js";

const findAll = async (req, resp) => {
  const respuesta = await repository.findAll();
  return sendResponse(respuesta, "No se encontró.", 404, resp);
}

const findOne = async (req, resp) => {
  const respuesta = await repository.findOne(req.params.id);

  return sendResponse(respuesta, "No se encontró.", 404, resp);
}

const findByUsuario = async (req, resp) => {
  const respuesta = await repository.findByUsuario(req.params.usuarioId);

  return sendResponse(respuesta, "No se encontró.", 404, resp);
}

const create = async (req, resp) => {
  const { usuarioId, items } = req.body;

  if (!usuarioId || !Array.isArray(items) || items.length === 0)
    return sendResponse(null, "Se requiere usuarioId y al menos un item.", 400, resp);

  const respuesta = await repository.createConDetalles({ usuarioId, items });

  return sendResponse(respuesta, "No se pudo crear.", 400, resp);
}

const remove = async (req, resp) => {
  const respuesta = await repository.remove(req.params.id);

  return sendResponse(respuesta, "No se encontró.", 404, resp);
}

const sendResponse = (respuesta, menssage, errorCode, resp) => {
  if (!respuesta)
    return resp.status(errorCode).json({ success:false, menssage })
  else
    return resp.status(200).json(respuesta);
}

const controller = { findAll, findOne, findByUsuario, create, remove }

export default controller;
