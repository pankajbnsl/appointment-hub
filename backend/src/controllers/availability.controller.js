const Availability = require('../models/Availability');

const addAvailability = async (req, res) => {
  try {
    const providerId = req.user.userId;
    const { date, slots } = req.body;

    const existing = await Availability.findOne({ provider: providerId, date });
    if (existing) {
      return res.status(400).json({ message: 'Availability already set for this date' });
    }

    const availability = await Availability.create({
      provider: providerId,
      date,
      slots,
    });

    res.status(201).json({ message: 'Availability created', availability });
  } catch (err) {
    console.error('Add availability error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAvailabilityByProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;

    const availability = await Availability.find({ provider: providerId }).sort({ date: 1 });

    res.json(availability);
  } catch (err) {
    console.error('Fetch availability error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addAvailability, getAvailabilityByProvider };
