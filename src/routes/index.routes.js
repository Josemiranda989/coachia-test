import { Router } from 'express';
import userRoutes from './user.routes.js';
import trainingRoutes from './trainingPlan.routes.js';

const router = Router();

// UserId hardcodeado por ahora
const userId = 'user-123';

// Health check
router.get('/api/health', async (req, res) => {
  return res.status(200).json({
    status: 'ok'
  });
});

// Rutas de USUARIOS
router.use('/api/users', userRoutes);

// Rutas de TrainingPlan
router.use('/api/training-plans', trainingRoutes);

export default router;