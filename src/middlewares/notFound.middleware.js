// Middleware para rutas inexistentes
const notFoundMiddleware = async (req, res) => {
  return res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
};

export default notFoundMiddleware;