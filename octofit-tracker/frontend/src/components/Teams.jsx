import { useEffect, useState } from 'react';
import { fetchFromApi, postToApi } from '../config/apiConfig';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    leaderId: '',
  });

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/teams');
        setTeams(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };
    loadTeams();
  }, []);

  const handleAddTeam = async (e) => {
    e.preventDefault();
    try {
      await postToApi('/teams', newTeam);
      setNewTeam({ name: '', description: '', leaderId: '' });
      // Reload teams after adding
      const data = await fetchFromApi('/teams');
      setTeams(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="alert alert-info">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Teams</h2>

      <div className="card mb-4">
        <div className="card-header">Create New Team</div>
        <div className="card-body">
          <form onSubmit={handleAddTeam}>
            <div className="mb-3">
              <label className="form-label">Team Name</label>
              <input
                type="text"
                className="form-control"
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={newTeam.description}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, description: e.target.value })
                }
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Leader ID</label>
              <input
                type="text"
                className="form-control"
                value={newTeam.leaderId}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, leaderId: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Team
            </button>
          </form>
        </div>
      </div>

      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Members: {team.members?.length || 0}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {teams.length === 0 && <div className="alert alert-info">No teams found</div>}
    </div>
  );
}

export default Teams;
