# OctoFit Tracker - Frontend (React 19 + Vite)

A modern React 19 presentation tier for the OctoFit Tracker multi-tier application built with Vite and Bootstrap.

## Features

- **User Management**: Create and manage fitness users
- **Activity Tracking**: Log and view fitness activities (running, cycling, weightlifting, etc.)
- **Team Management**: Create and manage fitness teams
- **Leaderboard**: Competitive ranking system with user statistics
- **Workout Suggestions**: Browse and create personalized workout plans
- **Responsive Design**: Bootstrap-based responsive UI
- **React Router Navigation**: Multi-page SPA with client-side routing

## Setup

### 1. Install Dependencies

```bash
npm install --prefix octofit-tracker/frontend
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and set your Codespace name:

```bash
cp octofit-tracker/frontend/.env.local.example octofit-tracker/frontend/.env.local
```

Edit `.env.local` and add your Codespace name:

```
VITE_CODESPACE_NAME=your-codespace-name
```

**To find your Codespace name:**
- Check the browser URL when using GitHub Codespaces (e.g., `legendary-meme-7vjv74px7rqcp57w-5173.app.github.dev`)
- Or run: `echo $CODESPACE_NAME` in the terminal

**If not using Codespaces:**
- Leave `VITE_CODESPACE_NAME` unset to use `http://localhost:8000/api` (local development)

### 3. Run Development Server

```bash
npm run dev --prefix octofit-tracker/frontend
```

The app will be available at:
- Codespaces: `https://{CODESPACE_NAME}-5173.app.github.dev`
- Local: `http://localhost:5173`

### 4. Build for Production

```bash
npm run build --prefix octofit-tracker/frontend
```

## Architecture

### Components

- **`Users.jsx`** - User management with create/view functionality
- **`Activities.jsx`** - Activity logging and tracking
- **`Teams.jsx`** - Team creation and management
- **`Leaderboard.jsx`** - Competitive rankings and statistics
- **`Workouts.jsx`** - Workout suggestions and planning

### API Configuration

The app automatically detects the environment and builds the correct API URL:

- **Codespaces**: `https://{CODESPACE_NAME}-8000.app.github.dev/api`
- **Local**: `http://localhost:8000/api`

See `src/config/apiConfig.js` for implementation details.

## API Endpoints

The frontend communicates with the backend API:

- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/activities` - List all activities
- `POST /api/activities` - Log new activity
- `GET /api/teams` - List all teams
- `POST /api/teams` - Create new team
- `GET /api/leaderboard` - Get competitive rankings
- `GET /api/workouts` - List workout suggestions
- `POST /api/workouts` - Create new workout

## Stack

- **React 19** - Modern UI framework
- **Vite** - Lightning-fast build tool with HMR
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - Responsive CSS framework
- **Oxlint** - Fast ESLint alternative

## Development

### Environment Variables

Create `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

### Hot Module Replacement (HMR)

Vite provides instant feedback during development. Changes to component files will automatically update in the browser.

### Linting

```bash
npm run lint --prefix octofit-tracker/frontend
```

