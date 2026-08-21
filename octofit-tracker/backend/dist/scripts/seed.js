"use strict";
// test data seed description
/**
 * TEST DATA SEED DESCRIPTION
 * =========================
 * This script populates the octofit_db MongoDB database with realistic test data
 * for the Octofit Tracker multi-tier application. It's designed to provide a
 * complete dataset to support development and testing of all application features.
 *
 * SEED DATA STRUCTURE:
 *
 * Users (3 total):
 *   - john_doe (john@example.com) | "Fitness enthusiast" | Team owner (Morning Runners)
 *   - jane_smith (jane@example.com) | "Marathon runner" | Team member (Morning Runners)
 *   - mike_johnson (mike@example.com) | "Gym lover" | Team owner (Gym Crew)
 *   Note: All passwords are hashed with bcrypt (plaintext: "password123")
 *
 * Teams (2 total):
 *   - Morning Runners (Owner: john_doe, Members: john_doe + jane_smith)
 *     Purpose: Early risers who love running
 *   - Gym Crew (Owner: mike_johnson, Members: mike_johnson)
 *     Purpose: Strength training enthusiasts
 *
 * Activities (3 total):
 *   - john_doe: Running (30 min, 5 km, 300 cal) - "Morning run"
 *   - jane_smith: Cycling (45 min, 20 km, 400 cal) - "Afternoon bike ride"
 *   - mike_johnson: Weightlifting (60 min, 350 cal) - "Gym session"
 *
 * Leaderboard (3 entries, ranked by score):
 *   1. john_doe: Score 1500 (5 activities, 250 min total) - Morning Runners team
 *   2. jane_smith: Score 1200 (4 activities, 200 min total) - Morning Runners team
 *   3. mike_johnson: Score 1100 (3 activities, 180 min total) - Gym Crew team
 *
 * Workouts (3 total workout templates):
 *   - Morning Jog (Easy, 30 min) | Exercises: jogging | Target: cardio
 *   - HIIT Training (Hard, 20 min) | Exercises: burpees, jump squats, mountain climbers
 *     Target: full body, cardio
 *   - Strength Training (Medium, 60 min) | Exercises: bench press, squats, deadlifts
 *     Target: chest, legs, back
 *
 * USAGE:
 *   npm run seed
 *
 * The script will:
 * 1. Connect to MongoDB (mongodb://localhost:27017/octofit_db)
 * 2. Clear all existing collections
 * 3. Create sample users with securely hashed passwords
 * 4. Create teams with user memberships
 * 5. Create user activity logs
 * 6. Create leaderboard entries with rankings
 * 7. Create workout templates for user selection
 * 8. Disconnect from MongoDB
 *
 * SECURITY NOTES:
 * - Passwords are hashed using bcrypt with 10 salt rounds
 * - All test user passwords hash to the same value for reproducibility
 * - This data is for development/testing only
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Workout_1 = __importDefault(require("../models/Workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        // Clear existing data
        await User_1.default.deleteMany({});
        await Team_1.default.deleteMany({});
        await Activity_1.default.deleteMany({});
        await Leaderboard_1.default.deleteMany({});
        await Workout_1.default.deleteMany({});
        console.log('Cleared existing data');
        // Hash passwords for test users
        const hashedPassword = await bcrypt_1.default.hash('password123', 10);
        // Create sample users
        const users = await User_1.default.insertMany([
            {
                username: 'john_doe',
                email: 'john@example.com',
                password: hashedPassword,
                displayName: 'John Doe',
                bio: 'Fitness enthusiast',
            },
            {
                username: 'jane_smith',
                email: 'jane@example.com',
                password: hashedPassword,
                displayName: 'Jane Smith',
                bio: 'Marathon runner',
            },
            {
                username: 'mike_johnson',
                email: 'mike@example.com',
                password: hashedPassword,
                displayName: 'Mike Johnson',
                bio: 'Gym lover',
            },
        ]);
        console.log(`Created ${users.length} users`);
        // Create sample teams
        const teams = await Team_1.default.insertMany([
            {
                name: 'Morning Runners',
                description: 'Early risers who love running',
                owner: users[0]._id,
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Gym Crew',
                description: 'Strength training enthusiasts',
                owner: users[2]._id,
                members: [users[2]._id],
            },
        ]);
        console.log(`Created ${teams.length} teams`);
        // Create sample activities
        const activities = await Activity_1.default.insertMany([
            {
                userId: users[0]._id,
                type: 'running',
                duration: 30,
                distance: 5,
                caloriesBurned: 300,
                description: 'Morning run',
            },
            {
                userId: users[1]._id,
                type: 'cycling',
                duration: 45,
                distance: 20,
                caloriesBurned: 400,
                description: 'Afternoon bike ride',
            },
            {
                userId: users[2]._id,
                type: 'weightlifting',
                duration: 60,
                caloriesBurned: 350,
                description: 'Gym session',
            },
        ]);
        console.log(`Created ${activities.length} activities`);
        // Create sample leaderboard entries
        const leaderboard = await Leaderboard_1.default.insertMany([
            {
                userId: users[0]._id,
                teamId: teams[0]._id,
                score: 1500,
                rank: 1,
                totalActivities: 5,
                totalDuration: 250,
            },
            {
                userId: users[1]._id,
                teamId: teams[0]._id,
                score: 1200,
                rank: 2,
                totalActivities: 4,
                totalDuration: 200,
            },
            {
                userId: users[2]._id,
                teamId: teams[1]._id,
                score: 1100,
                rank: 3,
                totalActivities: 3,
                totalDuration: 180,
            },
        ]);
        console.log(`Created ${leaderboard.length} leaderboard entries`);
        // Create sample workouts
        const workouts = await Workout_1.default.insertMany([
            {
                title: 'Morning Jog',
                description: 'Easy paced 3-mile jog',
                difficulty: 'easy',
                duration: 30,
                exercises: ['jogging'],
                targetMuscleGroups: ['cardio'],
            },
            {
                title: 'HIIT Training',
                description: 'High intensity interval training',
                difficulty: 'hard',
                duration: 20,
                exercises: ['burpees', 'jump squats', 'mountain climbers'],
                targetMuscleGroups: ['full body', 'cardio'],
            },
            {
                title: 'Strength Training',
                description: 'Upper body strength workout',
                difficulty: 'medium',
                duration: 60,
                exercises: ['bench press', 'squats', 'deadlifts'],
                targetMuscleGroups: ['chest', 'legs', 'back'],
            },
        ]);
        console.log(`Created ${workouts.length} workouts`);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
