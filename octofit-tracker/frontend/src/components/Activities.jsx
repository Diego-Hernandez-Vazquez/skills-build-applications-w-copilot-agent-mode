import { useEffect, useState } from 'react';
import { fetchFromApi, postToApi } from '../config/apiConfig';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    userId: '',
    type: 'running',
    duration: '',
    distance: '',
    caloriesBurned: '',
    description: '',
  });

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/activities');
        setActivities(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };
    loadActivities();
  }, []);

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newActivity,
        duration: Number(newActivity.duration),
        distance: newActivity.distance ? Number(newActivity.distance) : undefined,
        caloriesBurned: Number(newActivity.caloriesBurned),
      };
      await postToApi('/activities', payload);
      setNewActivity({
        userId: '',
        type: 'running',
        duration: '',
        distance: '',
        caloriesBurned: '',
        description: '',
      });
      // Reload activities after adding
      const data = await fetchFromApi('/activities');
      setActivities(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="alert alert-info">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Activities</h2>

      <div className="card mb-4">
        <div className="card-header">Log New Activity</div>
        <div className="card-body">
          <form onSubmit={handleAddActivity}>
            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control"
                value={newActivity.userId}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, userId: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Activity Type</label>
              <select
                className="form-select"
                value={newActivity.type}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, type: e.target.value })
                }
              >
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
                <option value="weightlifting">Weightlifting</option>
                <option value="swimming">Swimming</option>
                <option value="walking">Walking</option>
                <option value="yoga">Yoga</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                value={newActivity.duration}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, duration: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Distance (km)</label>
              <input
                type="number"
                className="form-control"
                value={newActivity.distance}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, distance: e.target.value })
                }
                step="0.1"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Calories Burned</label>
              <input
                type="number"
                className="form-control"
                value={newActivity.caloriesBurned}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, caloriesBurned: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={newActivity.description}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, description: e.target.value })
                }
                rows="2"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Log Activity
            </button>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Distance (km)</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>
                  {activity.userId?.displayName || activity.userId?.username || 'Unknown'}
                </td>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
                <td>{activity.distance || '-'}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{new Date(activity.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activities.length === 0 && (
        <div className="alert alert-info">No activities found</div>
      )}
    </div>
  );
}

export default Activities;
