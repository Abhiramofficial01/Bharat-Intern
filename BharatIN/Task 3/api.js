const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

// Define API routes
router.get('/transactions', transactionsController.getAllTransactions);
router.post('/transactions', transactionsController.addTransaction);

module.exports = router;
