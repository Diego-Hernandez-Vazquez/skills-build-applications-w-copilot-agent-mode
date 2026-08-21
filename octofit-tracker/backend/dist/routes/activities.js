"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
// GET /api/activities/user/:userId - Get activities by user
router.get('/user/:userId', async (request, response) => {
    try {
        const activities = await Activity_1.default.find({ userId: request.params.userId }).populate('userId');
        response.json(activities);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// GET /api/activities - Get all activities
router.get('/', async (_request, response) => {
    try {
        const activities = await Activity_1.default.find().populate('userId');
        response.json(activities);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch activities' });
    }
});
// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (request, response) => {
    try {
        const activity = await Activity_1.default.findById(request.params.id).populate('userId');
        if (!activity) {
            return response.status(404).json({ error: 'Activity not found' });
        }
        response.json(activity);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch activity' });
    }
});
// POST /api/activities - Create activity
router.post('/', async (request, response) => {
    try {
        const activity = new Activity_1.default(request.body);
        await activity.save();
        await activity.populate('userId');
        response.status(201).json(activity);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to create activity' });
    }
});
// PUT /api/activities/:id - Update activity
router.put('/:id', async (request, response) => {
    try {
        const activity = await Activity_1.default.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!activity) {
            return response.status(404).json({ error: 'Activity not found' });
        }
        response.json(activity);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to update activity' });
    }
});
// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (request, response) => {
    try {
        const activity = await Activity_1.default.findByIdAndDelete(request.params.id);
        if (!activity) {
            return response.status(404).json({ error: 'Activity not found' });
        }
        response.json({ message: 'Activity deleted' });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to delete activity' });
    }
});
exports.default = router;
