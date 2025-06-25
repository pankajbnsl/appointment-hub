const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const allowRoles = require('../middlewares/role.middleware');
const {
  addAvailability,
  getAvailabilityByProvider,
} = require('../controllers/availability.controller');

router.post('/', auth, allowRoles('provider'), addAvailability);

router.get('/:providerId', getAvailabilityByProvider);

module.exports = router;
