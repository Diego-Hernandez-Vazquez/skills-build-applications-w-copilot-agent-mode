"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
// GET /api/workouts/difficulty/:difficulty - Get workouts by difficulty
router.get('/difficulty/:difficulty', async (request, response) => {
    try {
        const workouts = await Workout_1.default.find({
            difficulty: request.params.difficulty,
        });
        response.json(workouts);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET /api/workouts - Get all workouts
router.get('/', async (_request, response) => {
    try {
        const workouts = await Workout_1.default.find();
        response.json(workouts);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (request, response) => {
    try {
        const workout = await Workout_1.default.findById(request.params.id);
        if (!workout) {
            return response.status(404).json({ error: 'Workout not found' });
        }
        response.json(workout);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// POST /api/workouts - Create workout
router.post('/', async (request, response) => {
    try {
        const workout = new Workout_1.default(request.body);
        await workout.save();
        response.status(201).json(workout);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to create workout' });
    }
});
// PUT /api/workouts/:id - Update workout
router.put('/:id', async (request, response) => {
    try {
        const workout = await Workout_1.default.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!workout) {
            return response.status(404).json({ error: 'Workout not found' });
        }
        response.json(workout);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to update workout' });
    }
});
// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (request, response) => {
    try {
        const workout = await Workout_1.default.findByIdAndDelete(request.params.id);
        if (!workout) {
            return response.status(404).json({ error: 'Workout not found' });
        }
        response.json({ message: 'Workout deleted' });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to delete workout' });
    }
});
exports.default = router;
