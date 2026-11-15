const express = require('express');
const router = express.Router();
const coffeeController = require('../controllers/coffeeController.js');
const { requireEmployee } = require('../middleware/coffeeMiddleware.js');

router.get('/', coffeeController.renderHome);
router.get('/menu', coffeeController.renderMenu);
router.post('/reviews', coffeeController.handleReviewSubmit);
router.get('/order', coffeeController.renderOrderPage);
router.post('/order', coffeeController.handleOrderSubmit);

router.get('/dashboard', requireEmployee, coffeeController.renderDashboard);
router.post('/orders/:id/status', requireEmployee, coffeeController.handleStatusUpdate);

module.exports = router;
