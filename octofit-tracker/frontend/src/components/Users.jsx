import { useEffect, useState } from 'react';
import { fetchFromApi, postToApi } from '../config/apiConfig';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    displayName: '',
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi('/users');
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await postToApi('/users', newUser);
      setNewUser({ username: '', email: '', password: '', displayName: '' });
      // Reload users after adding
      const data = await fetchFromApi('/users');
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="alert alert-info">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Users</h2>

      <div className="card mb-4">
        <div className="card-header">Add New User</div>
        <div className="card-body">
          <form onSubmit={handleAddUser}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Display Name</label>
              <input
                type="text"
                className="form-control"
                value={newUser.displayName}
                onChange={(e) =>
                  setNewUser({ ...newUser, displayName: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add User
            </button>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Display Name</th>
              <th>Email</th>
              <th>Bio</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.bio || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && <div className="alert alert-info">No users found</div>}
    </div>
  );
}

export default Users;
