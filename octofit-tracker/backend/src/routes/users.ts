import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// GET /api/users - Get all users
router.get('/', async (_request: Request, response: Response) => {
  try {
    const users = await User.find().select('-password');
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const user = await User.findById(request.params.id).select('-password');
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    response.json(user);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users - Create user
router.post('/', async (request: Request, response: Response) => {
  try {
    const { username, email, password, displayName } = request.body;
    const user = new User({ username, email, password, displayName });
    await user.save();
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    response.json({ message: 'User deleted' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
