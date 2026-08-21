"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
// GET /api/leaderboard/user/:userId - Get user leaderboard entry
router.get('/user/:userId', async (request, response) => {
    try {
        const entry = await Leaderboard_1.default.findOne({ userId: request.params.userId })
            .populate('userId')
            .populate('teamId');
        if (!entry) {
            return response.status(404).json({ error: 'Leaderboard entry not found' });
        }
        response.json(entry);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch leaderboard entry' });
    }
});
// GET /api/leaderboard - Get leaderboard
router.get('/', async (_request, response) => {
    try {
        const leaderboard = await Leaderboard_1.default.find()
            .sort({ score: -1 })
            .populate('userId')
            .populate('teamId');
        response.json(leaderboard);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// POST /api/leaderboard - Create leaderboard entry
router.post('/', async (request, response) => {
    try {
        const entry = new Leaderboard_1.default(request.body);
        await entry.save();
        await entry.populate('userId');
        response.status(201).json(entry);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to create leaderboard entry' });
    }
});
// PUT /api/leaderboard/:id - Update leaderboard entry
router.put('/:id', async (request, response) => {
    try {
        const entry = await Leaderboard_1.default.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!entry) {
            return response.status(404).json({ error: 'Leaderboard entry not found' });
        }
        response.json(entry);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to update leaderboard entry' });
    }
});
exports.default = router;
