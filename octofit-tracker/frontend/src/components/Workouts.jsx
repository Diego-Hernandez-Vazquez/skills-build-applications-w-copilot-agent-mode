import { useEffect, useState } from 'react';
import { fetchFromApi, postToApi } from '../config/apiConfig';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newWorkout, setNewWorkout] = useState({
    title: '',
    description: '',
    difficulty: 'intermediate',
    estimatedDuration: '',
    exercises: '',
  });

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/workouts');
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, []);

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newWorkout,
        estimatedDuration: Number(newWorkout.estimatedDuration),
        exercises: newWorkout.exercises.split(',').map((ex) => ex.trim()),
      };
      await postToApi('/workouts', payload);
      setNewWorkout({
        title: '',
        description: '',
        difficulty: 'intermediate',
        estimatedDuration: '',
        exercises: '',
      });
      // Reload workouts after adding
      const data = await fetchFromApi('/workouts');
      setWorkouts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="alert alert-info">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>💪 Workout Suggestions</h2>

      <div className="card mb-4">
        <div className="card-header">Add New Workout</div>
        <div className="card-body">
          <form onSubmit={handleAddWorkout}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={newWorkout.title}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, title: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={newWorkout.description}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, description: e.target.value })
                }
                rows="2"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Difficulty</label>
              <select
                className="form-select"
                value={newWorkout.difficulty}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, difficulty: e.target.value })
                }
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Estimated Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                value={newWorkout.estimatedDuration}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, estimatedDuration: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Exercises (comma-separated)
              </label>
              <textarea
                className="form-control"
                value={newWorkout.exercises}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, exercises: e.target.value })
                }
                rows="3"
                placeholder="e.g., Push-ups, Squats, Planks"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Workout
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text">{workout.description}</p>
                <div className="mb-2">
                  <span
                    className={`badge ${
                      workout.difficulty === 'beginner'
                        ? 'bg-success'
                        : workout.difficulty === 'intermediate'
                          ? 'bg-warning'
                          : 'bg-danger'
                    }`}
                  >
                    {workout.difficulty}
                  </span>
                </div>
                <p className="card-text">
                  <small className="text-muted">
                    Duration: {workout.estimatedDuration} min
                  </small>
                </p>
                {workout.exercises && workout.exercises.length > 0 && (
                  <div>
                    <strong>Exercises:</strong>
                    <ul className="mb-0">
                      {workout.exercises.map((exercise, idx) => (
                        <li key={idx}>{exercise}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {workouts.length === 0 && (
        <div className="alert alert-info">No workouts available</div>
      )}
    </div>
  );
}

export default Workouts;
