"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// GET /api/users - Get all users
router.get('/', async (_request, response) => {
    try {
        const users = await User_1.default.find().select('-password');
        response.json(users);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch users' });
    }
});
// GET /api/users/:id - Get user by ID
router.get('/:id', async (request, response) => {
    try {
        const user = await User_1.default.findById(request.params.id).select('-password');
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        response.json(user);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch user' });
    }
});
// POST /api/users - Create user
router.post('/', async (request, response) => {
    try {
        const { username, email, password, displayName } = request.body;
        const user = new User_1.default({ username, email, password, displayName });
        await user.save();
        response.status(201).json(user);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to create user' });
    }
});
// PUT /api/users/:id - Update user
router.put('/:id', async (request, response) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        response.json(user);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to update user' });
    }
});
// DELETE /api/users/:id - Delete user
router.delete('/:id', async (request, response) => {
    try {
        const user = await User_1.default.findByIdAndDelete(request.params.id);
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        response.json({ message: 'User deleted' });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;
