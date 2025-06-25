import { useEffect, useState } from 'react';
import api from '../api/axios';

const ClientPanel = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [availability, setAvailability] = useState([]);
  const [message, setMessage] = useState('');
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    api.get('/auth/providers').then((res) => setProviders(res.data));
    fetchMyBookings();
  }, []);

  const fetchAvailability = () => {
    api.get(`/availability/${selectedProvider}`).then((res) => setAvailability(res.data));
  };

  const fetchMyBookings = async () => {
    try {
      const res = await api.get('/bookings/me');
      setMyBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    }
  };

  const bookSlot = async (date, time) => {
    try {
      await api.post('/bookings', { providerId: selectedProvider, date, time });
      setMessage('Slot booked!');
      fetchAvailability();
      fetchMyBookings();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  const today = new Date();
  const upcoming = myBookings.filter(b => new Date(b.date) >= today);
  const past = myBookings.filter(b => new Date(b.date) < today);

  return (
    <div className="client-panel">
      <h3 className="client-title">Client Panel</h3>

      <div className="client-controls">
        <select onChange={(e) => setSelectedProvider(e.target.value)} value={selectedProvider}>
          <option value="">-- Select Provider --</option>
          {providers.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <button onClick={fetchAvailability} disabled={!selectedProvider}>
          Check Availability
        </button>
      </div>

      {availability.map((a) => (
        <div key={a._id} className="availability-section">
          <strong>{a.date}</strong>
          <ul className="slot-list">
            {a.slots.map((slot, i) =>
              !slot.isBooked ? (
                <li key={i} className="slot-item">
                  {slot.time}
                  <button onClick={() => bookSlot(a.date, slot.time)}>Book</button>
                </li>
              ) : null
            )}
          </ul>
        </div>
      ))}
      {message && <p className="message">{message}</p>}

      <div className="booking-section">
        <h4>Your Upcoming Bookings</h4>
        {upcoming.length ? (
          <ul className="booking-list">
            {upcoming.map(b => (
              <li key={b._id} className="booking-card">
                {b.date} at {b.time} with {b.provider?.name}
              </li>
            ))}
          </ul>
        ) : <p className="no-booking">No upcoming bookings</p>}
      </div>

      <div className="booking-section">
        <h4>Your Past Bookings</h4>
        {past.length ? (
          <ul className="booking-list">
            {past.map(b => (
              <li key={b._id} className="booking-card">
                {b.date} at {b.time} with {b.provider?.name}
              </li>
            ))}
          </ul>
        ) : <p className="no-booking">No past bookings</p>}
      </div>
    </div>
  );
};

export default ClientPanel;
