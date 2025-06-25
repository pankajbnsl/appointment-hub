const Booking = require('../models/Booking');
const Availability = require('../models/Availability');

const bookSlot = async (req, res) => {
  try {
    const clientId = req.user.userId;
    const { providerId, date, time } = req.body;

    const availability = await Availability.findOne({ provider: providerId, date });
    if (!availability) {
      return res.status(404).json({ message: 'No availability found for this date' });
    }

    const slot = availability.slots.find((s) => s.time === time && !s.isBooked);
    if (!slot) {
      return res.status(400).json({ message: 'Slot not available or already booked' });
    }

    slot.isBooked = true;
    await availability.save();

    const booking = await Booking.create({
      client: clientId,
      provider: providerId,
      date,
      time,
    });

    res.status(201).json({ message: 'Slot booked successfully', booking });
  } catch (err) {
    console.error('Booking error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const { userId, role } = req.user;

    let filter = {};
    if (role === 'client') {
      filter.client = userId;
    } else if (role === 'provider') {
      filter.provider = userId;
    }

    const bookings = await Booking.find(filter)
      .populate('client', 'name email')
      .populate('provider', 'name email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('Fetch bookings error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('client', 'name email')
      .populate('provider', 'name email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('Admin booking fetch error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookSlot, getMyBookings, getAllBookings };
