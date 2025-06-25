const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/availability', require('./routes/availability.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));

module.exports = app;
