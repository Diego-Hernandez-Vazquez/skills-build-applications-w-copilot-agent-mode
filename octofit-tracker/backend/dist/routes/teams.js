"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
// GET /api/teams - Get all teams
router.get('/', async (_request, response) => {
    try {
        const teams = await Team_1.default.find().populate('owner').populate('members');
        response.json(teams);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// GET /api/teams/:id - Get team by ID
router.get('/:id', async (request, response) => {
    try {
        const team = await Team_1.default.findById(request.params.id).populate('owner').populate('members');
        if (!team) {
            return response.status(404).json({ error: 'Team not found' });
        }
        response.json(team);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch team' });
    }
});
// POST /api/teams - Create team
router.post('/', async (request, response) => {
    try {
        const { name, description, owner } = request.body;
        const team = new Team_1.default({ name, description, owner, members: [owner] });
        await team.save();
        await team.populate('owner');
        response.status(201).json(team);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to create team' });
    }
});
// PUT /api/teams/:id - Update team
router.put('/:id', async (request, response) => {
    try {
        const team = await Team_1.default.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!team) {
            return response.status(404).json({ error: 'Team not found' });
        }
        response.json(team);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to update team' });
    }
});
// DELETE /api/teams/:id - Delete team
router.delete('/:id', async (request, response) => {
    try {
        const team = await Team_1.default.findByIdAndDelete(request.params.id);
        if (!team) {
            return response.status(404).json({ error: 'Team not found' });
        }
        response.json({ message: 'Team deleted' });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to delete team' });
    }
});
exports.default = router;
