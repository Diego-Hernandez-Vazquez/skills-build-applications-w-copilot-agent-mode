# OctoFit Tracker Frontend Setup Guide

## Quick Start

### 1. Set Environment Variable for Codespaces

Before running the frontend, you need to configure the API base URL.

**For GitHub Codespaces:**

```bash
# Find your Codespace name from the browser URL or environment
echo $CODESPACE_NAME

# Create .env.local file
cat > octofit-tracker/frontend/.env.local << EOF
VITE_CODESPACE_NAME=$CODESPACE_NAME
EOF
```

**For Local Development:**

Create `octofit-tracker/frontend/.env.local` without setting `VITE_CODESPACE_NAME`:

```bash
# Leave empty - the app will use http://localhost:8000/api
touch octofit-tracker/frontend/.env.local
```

### 2. Install Dependencies

```bash
npm install --prefix octofit-tracker/frontend
```

### 3. Run Development Server

```bash
npm run dev --prefix octofit-tracker/frontend
```

The app will be available at:
- **Codespaces**: `https://{CODESPACE_NAME}-5173.app.github.dev`
- **Local**: `http://localhost:5173`

### 4. Build for Production

```bash
npm run build --prefix octofit-tracker/frontend
```

## API Configuration Details

The application uses Vite environment variables to configure the API base URL:

### File: `src/config/apiConfig.js`

This module handles:
- Reading `VITE_CODESPACE_NAME` from environment
- Building correct API URLs for Codespaces or localhost
- Fetching data from API endpoints
- Handling both array and paginated responses

### Example URL Construction

**With Codespaces:**
```
VITE_CODESPACE_NAME=legendary-meme-7vjv74px7rqcp57w
→ API Base URL: https://legendary-meme-7vjv74px7rqcp57w-8000.app.github.dev/api
```

**Without Codespaces:**
```
VITE_CODESPACE_NAME=undefined or not set
→ API Base URL: http://localhost:8000/api
```

## Component Structure

### Navigation Menu

All components are accessible via the navigation bar:

1. **Users** (`/users`)
   - Create new users
   - View all registered users
   - Display user profiles

2. **Activities** (`/activities`)
   - Log new fitness activities
   - View activity history
   - Track calories and distance

3. **Teams** (`/teams`)
   - Create fitness teams
   - Manage team members
   - View team details

4. **Leaderboard** (`/leaderboard`)
   - View competitive rankings
   - See top performers
   - Track user statistics

5. **Workouts** (`/workouts`)
   - Browse workout suggestions
   - Create custom workouts
   - Filter by difficulty level

## Troubleshooting

### API Connection Issues

**Error: "Failed to fetch from https://undefined-8000..."**
- Cause: `VITE_CODESPACE_NAME` is not set or has `undefined` value
- Solution: Check `.env.local` and set it to your actual Codespace name

**Error: "Connection refused at http://localhost:8000"**
- Cause: Backend API server is not running
- Solution: Ensure backend is running with `npm run dev --prefix octofit-tracker/backend`

### Environment Variable Not Loading

- Restart the dev server after creating/editing `.env.local`
- Vite reads environment variables at build time
- Changes to `.env.local` require a restart

### MongoDB Connection Errors

- Ensure MongoDB is running: `ps aux | grep mongod`
- Backend needs to connect to `mongodb://localhost:27017/octofit_db`

## Testing the API

### Test from Browser Console

```javascript
// Check current API base URL
import { getApiBaseUrl } from './config/apiConfig.js'
console.log(getApiBaseUrl());

// Fetch users
import { fetchFromApi } from './config/apiConfig.js'
fetchFromApi('/users').then(data => console.log(data));
```

### Test with curl

```bash
# Check API health
curl http://localhost:8000/api/health

# Get all users
curl http://localhost:8000/api/users

# Get all activities
curl http://localhost:8000/api/activities
```

## Port Configuration

- **Frontend**: 5173 (Vite dev server)
- **Backend API**: 8000 (Express server)
- **MongoDB**: 27017 (MongoDB server)

Make sure these ports are available and not in use by other applications.
