// routes/transactionRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Rota para criar uma nova transação
router.post('/', [
  body('type').isIn(['income', 'expense']).withMessage('Type must be "income" or "expense"'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('description').trim().notEmpty().withMessage('Description is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  transactionController.createTransaction(req, res);
});

// Rota para atualizar uma transação existente
router.put('/:id', [
  body('type').optional().isIn(['income', 'expense']).withMessage('Type must be "income" or "expense"'),
  body('amount').optional().isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('description').optional().trim().notEmpty().withMessage('Description is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  transactionController.updateTransaction(req, res);
});

// Rota para excluir uma transação existente
router.delete('/:id', transactionController.deleteTransaction);

// Rota para listar todas as transações
router.get('/', transactionController.listTransactions);

// Rota para exibir o saldo
router.get('/balance', transactionController.getBalance);

module.exports = router;