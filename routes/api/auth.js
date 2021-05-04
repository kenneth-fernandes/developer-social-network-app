import express from 'express';

export const authRouter = express.Router();

/**
 * @route GET api/auth
 * @description TEST route
 * @access Public
 */
authRouter.get('/', (req, res) => {
  res.send('Auth route');
});
