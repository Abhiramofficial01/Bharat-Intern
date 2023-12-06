const Transaction = require('../models/Transaction');

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addTransaction = async (req, res) => {
    try {
        const { description, amount } = req.body;
        const newTransaction = new Transaction({ description, amount });
        await newTransaction.save();
        res.json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllTransactions,
    addTransaction,
};
