import { useState, useEffect } from 'react';
import api from '../api/axios';

const ProviderPanel = () => {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState('');
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const slotList = slots.split(',').map((s) => ({ time: s.trim() }));
    try {
      await api.post('/availability', { date, slots: slotList });
      setMessage('Availability added!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await api.get('/bookings/me');
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to load bookings', err);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const today = new Date();
  const upcoming = bookings.filter(b => new Date(b.date) >= today);
  const past = bookings.filter(b => new Date(b.date) < today);

  return (
    <div className="provider-panel">
      <h3 className="provider-title">Provider Panel</h3>

      <form onSubmit={handleAdd} className="provider-form">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Slots (e.g. 10:00 AM, 11:00 AM)"
          value={slots}
          onChange={(e) => setSlots(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      {message && <p className="message">{message}</p>}

      <div className="booking-section">
        <h4>Upcoming Bookings</h4>
        {upcoming.length ? (
          <ul className="booking-list">
            {upcoming.map((b) => (
              <li key={b._id} className="booking-card">
                {b.date} at {b.time} — Client: {b.client.name}
              </li>
            ))}
          </ul>
        ) : <p className="no-booking">No upcoming bookings</p>}
      </div>

      <div className="booking-section">
        <h4>Past Bookings</h4>
        {past.length ? (
          <ul className="booking-list">
            {past.map((b) => (
              <li key={b._id} className="booking-card">
                {b.date} at {b.time} — Client: {b.client.name}
              </li>
            ))}
          </ul>
        ) : <p className="no-booking">No past bookings</p>}
      </div>
    </div>
  );
};

export default ProviderPanel;
