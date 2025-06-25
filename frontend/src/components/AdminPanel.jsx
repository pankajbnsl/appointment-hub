import { useEffect, useState } from 'react';
import api from '../api/axios';

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings/admin').then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="admin-panel">
      <h3 className="admin-title">Admin Panel — All Bookings</h3>
      <div className="booking-list">
        {bookings.map((b) => (
          <div className="booking-card" key={b._id}>
            <div className="booking-date">
              {b.date} at <strong>{b.time}</strong>
            </div>
            <div className="booking-info">
              <span className="client">{b.client.name}</span>
              <span className="arrow">→</span>
              <span className="provider">{b.provider.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
