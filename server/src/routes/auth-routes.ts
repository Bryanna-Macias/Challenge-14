import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

// POST /login - Login a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Sign JWT and send it to the client
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
    return res.json({ token });
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

// Login route
router.post('/login', login);

export default router;
