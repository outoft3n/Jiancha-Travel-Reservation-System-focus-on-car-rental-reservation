const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { getDashboard, getReservationReport } = require('../controllers/staffController');

// role-check middleware
const authorizeRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

router.get('/dashboard', authenticate, authorizeRole('staff'), getDashboard);
router.get('/reports/reservations', authenticate, authorizeRole('staff'), getReservationReport);

module.exports = router;