import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

// GET /api/workouts/difficulty/:difficulty - Get workouts by difficulty
router.get('/difficulty/:difficulty', async (request: Request, response: Response) => {
  try {
    const workouts = await Workout.find({
      difficulty: request.params.difficulty as any,
    });
    response.json(workouts);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET /api/workouts - Get all workouts
router.get('/', async (_request: Request, response: Response) => {
  try {
    const workouts = await Workout.find();
    response.json(workouts);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const workout = await Workout.findById(request.params.id);
    if (!workout) {
      return response.status(404).json({ error: 'Workout not found' });
    }
    response.json(workout);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST /api/workouts - Create workout
router.post('/', async (request: Request, response: Response) => {
  try {
    const workout = new Workout(request.body);
    await workout.save();
    response.status(201).json(workout);
  } catch (error) {
    response.status(400).json({ error: 'Failed to create workout' });
  }
});

// PUT /api/workouts/:id - Update workout
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!workout) {
      return response.status(404).json({ error: 'Workout not found' });
    }
    response.json(workout);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(request.params.id);
    if (!workout) {
      return response.status(404).json({ error: 'Workout not found' });
    }
    response.json({ message: 'Workout deleted' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
