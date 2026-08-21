import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const users = await User.insertMany([
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
        displayName: 'John Doe',
        bio: 'Fitness enthusiast',
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'password123',
        displayName: 'Jane Smith',
        bio: 'Marathon runner',
      },
      {
        username: 'mike_johnson',
        email: 'mike@example.com',
        password: 'password123',
        displayName: 'Mike Johnson',
        bio: 'Gym lover',
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create sample teams
    const teams = await Team.insertMany([
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
    const activities = await Activity.insertMany([
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
    const leaderboard = await Leaderboard.insertMany([
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
    const workouts = await Workout.insertMany([
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
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
