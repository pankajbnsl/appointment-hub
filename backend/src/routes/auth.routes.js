const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/providers', async (req, res) => {
  const providers = await User.find({ role: 'provider' }, 'name _id');
  res.json(providers);
});

module.exports = router;
