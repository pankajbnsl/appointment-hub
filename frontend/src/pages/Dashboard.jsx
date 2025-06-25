import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderPanel from '../components/ProviderPanel';
import ClientPanel from '../components/ClientPanel';
import AdminPanel from '../components/AdminPanel';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>
          Welcome, <span>{user?.name}</span> <small>({user?.role})</small>
        </h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        {user?.role === 'provider' && <ProviderPanel />}
        {user?.role === 'client' && <ClientPanel />}
        {user?.role === 'admin' && <AdminPanel />}
      </div>
    </div>
  );
};

export default Dashboard;
