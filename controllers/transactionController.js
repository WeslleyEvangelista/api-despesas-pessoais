// controllers/transactionController.js
const Transaction = require("../models/Transaction");

// Função para criar uma nova transação
exports.createTransaction = async (req, res) => {
    try {
      console.log(req.body);
  
      let { type, amount, description } = req.body;
  
      if (!type || !["income", "expense"].includes(type)) {
        return res.status(400).json({ error: 'Type must be income or expense' });
      }
  
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
      }
  
      if (!description) {
        return res.status(400).json({ error: 'Description is required' });
      }
  
      amount = parseFloat(amount);
  
      const transaction = await Transaction.create({ type, amount, description });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Função para atualizar uma transação existente
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, description } = req.body;
    await Transaction.update({ type, amount, description }, { where: { id } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para excluir uma transação existente
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para listar todas as transações
exports.listTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para exibir o saldo
exports.getBalance = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    const balance = transactions.reduce((acc, curr) => {
      return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
    }, 0);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};