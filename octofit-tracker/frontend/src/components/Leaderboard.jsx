import { useEffect, useState } from 'react';
import { fetchFromApi } from '../config/apiConfig';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/leaderboard');
        setLeaderboard(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };
    loadLeaderboard();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>🏆 Leaderboard</h2>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total Activities</th>
              <th>Total Duration (min)</th>
              <th>Total Distance (km)</th>
              <th>Total Calories</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id || index}>
                <td>
                  <strong>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && `#${index + 1}`}
                  </strong>
                </td>
                <td>{entry.user?.displayName || entry.user?.username || 'Unknown'}</td>
                <td>{entry.totalActivities || 0}</td>
                <td>{entry.totalDuration || 0}</td>
                <td>{(entry.totalDistance || 0).toFixed(2)}</td>
                <td>{entry.totalCalories || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leaderboard.length === 0 && (
        <div className="alert alert-info">No leaderboard data available</div>
      )}
    </div>
  );
}

export default Leaderboard;
