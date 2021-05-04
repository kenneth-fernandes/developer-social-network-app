import express from 'express';
import validatorPkg from 'express-validator';
import User from '../../models/Users.js';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
const { body, validationResult } = validatorPkg;

export const usersRouter = express.Router();

/**
 * @route POST api/users
 * @description Register Users
 * @access Public
 */
usersRouter.post(
  '/',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // Check if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exits' }] });
      }

      // Retrieve users gravatar
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

      user = new User({ name, email, avatar, password });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      res.send('User Registered');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);
