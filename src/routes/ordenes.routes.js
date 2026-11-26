import express from 'express';
import controller from '../controllers/ordenes.controller.js';

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.get('/usuario/:usuarioId', controller.findByUsuario)

export default router;