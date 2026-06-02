import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();

// GET - Obtener todos los usuarios del workspace
router.get('/', userController.getAll);

// POST - Crear un nuevo usuario
router.post('/', userController.create);

// GET - Obtener un usuario específico
router.get('/:id', userController.getById);

// PATCH - Actualizar un usuario
router.patch('/:id', userController.update);

// DELETE - Eliminar un usuario
router.delete('/:id', userController.remove);

export default router;
