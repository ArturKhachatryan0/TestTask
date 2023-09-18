const joiMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      const payload = {};
      if (Object.keys(req.params).length) payload.params = req.params;
      if (Object.keys(req.query).length) payload.query = req.query;
      if (Object.keys(req.body).length) payload.body = req.body;

      await schema.validateAsync(payload);
      next();
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  };
};

export default joiMiddleware;
