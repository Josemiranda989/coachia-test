import { Router } from 'express';

const router = Router();

// Health check básico
router.get('/api/health', async (req, res) => {
  return res.status(200).json({
    status: 'ok'
  });
});

export default router;