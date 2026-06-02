import { Router } from 'express';
import * as planController from '../controllers/trainingPlan.controller.js';

const router = Router();

// GET - list
router.get('/', planController.getAll);
// POST - create
router.post('/', planController.create);
// GET by id
router.get('/:id', planController.getById);
// PATCH - update
router.patch('/:id', planController.update);
// DELETE - remove
router.delete('/:id', planController.remove);

export default router;
