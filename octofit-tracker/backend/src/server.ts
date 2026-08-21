import express from 'express';
import './config/database';
import { getApiBaseUrl } from './config/apiUrl';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const port = Number(process.env.PORT || 8000);
const baseUrl = getApiBaseUrl();

app.use(express.json());

// Health check endpoint
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API Base URL: ${baseUrl}`);
});