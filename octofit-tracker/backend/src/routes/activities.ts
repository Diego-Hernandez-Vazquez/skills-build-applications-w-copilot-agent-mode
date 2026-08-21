import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET /api/activities/user/:userId - Get activities by user
router.get('/user/:userId', async (request: Request, response: Response) => {
  try {
    const activities = await Activity.find({ userId: request.params.userId }).populate('userId');
    response.json(activities);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET /api/activities - Get all activities
router.get('/', async (_request: Request, response: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    response.json(activities);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findById(request.params.id).populate('userId');
    if (!activity) {
      return response.status(404).json({ error: 'Activity not found' });
    }
    response.json(activity);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST /api/activities - Create activity
router.post('/', async (request: Request, response: Response) => {
  try {
    const activity = new Activity(request.body);
    await activity.save();
    await activity.populate('userId');
    response.status(201).json(activity);
  } catch (error) {
    response.status(400).json({ error: 'Failed to create activity' });
  }
});

// PUT /api/activities/:id - Update activity
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!activity) {
      return response.status(404).json({ error: 'Activity not found' });
    }
    response.json(activity);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(request.params.id);
    if (!activity) {
      return response.status(404).json({ error: 'Activity not found' });
    }
    response.json({ message: 'Activity deleted' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
