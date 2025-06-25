const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const allowRoles = require('../middlewares/role.middleware');
const {
  bookSlot,
  getMyBookings,
  getAllBookings,
} = require('../controllers/booking.controller');

router.post('/', auth, allowRoles('client'), bookSlot);

router.get('/me', auth, allowRoles('client', 'provider'), getMyBookings);

router.get('/admin', auth, allowRoles('admin'), getAllBookings);

module.exports = router;
