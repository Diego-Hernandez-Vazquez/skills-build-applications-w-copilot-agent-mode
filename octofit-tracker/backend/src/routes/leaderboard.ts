import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// GET /api/leaderboard/user/:userId - Get user leaderboard entry
router.get('/user/:userId', async (request: Request, response: Response) => {
  try {
    const entry = await Leaderboard.findOne({ userId: request.params.userId })
      .populate('userId')
      .populate('teamId');
    if (!entry) {
      return response.status(404).json({ error: 'Leaderboard entry not found' });
    }
    response.json(entry);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

// GET /api/leaderboard - Get leaderboard
router.get('/', async (_request: Request, response: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ score: -1 })
      .populate('userId')
      .populate('teamId');
    response.json(leaderboard);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// POST /api/leaderboard - Create leaderboard entry
router.post('/', async (request: Request, response: Response) => {
  try {
    const entry = new Leaderboard(request.body);
    await entry.save();
    await entry.populate('userId');
    response.status(201).json(entry);
  } catch (error) {
    response.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

// PUT /api/leaderboard/:id - Update leaderboard entry
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!entry) {
      return response.status(404).json({ error: 'Leaderboard entry not found' });
    }
    response.json(entry);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
});

export default router;
