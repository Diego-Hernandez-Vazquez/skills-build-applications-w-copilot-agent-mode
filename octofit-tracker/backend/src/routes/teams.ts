import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

// GET /api/teams - Get all teams
router.get('/', async (_request: Request, response: Response) => {
  try {
    const teams = await Team.find().populate('owner').populate('members');
    response.json(teams);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// GET /api/teams/:id - Get team by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const team = await Team.findById(request.params.id).populate('owner').populate('members');
    if (!team) {
      return response.status(404).json({ error: 'Team not found' });
    }
    response.json(team);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch team' });
  }
});

// POST /api/teams - Create team
router.post('/', async (request: Request, response: Response) => {
  try {
    const { name, description, owner } = request.body;
    const team = new Team({ name, description, owner, members: [owner] });
    await team.save();
    await team.populate('owner');
    response.status(201).json(team);
  } catch (error) {
    response.status(400).json({ error: 'Failed to create team' });
  }
});

// PUT /api/teams/:id - Update team
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!team) {
      return response.status(404).json({ error: 'Team not found' });
    }
    response.json(team);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update team' });
  }
});

// DELETE /api/teams/:id - Delete team
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const team = await Team.findByIdAndDelete(request.params.id);
    if (!team) {
      return response.status(404).json({ error: 'Team not found' });
    }
    response.json({ message: 'Team deleted' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
