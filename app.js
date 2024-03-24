// app.js
const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());

sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Error synchronizing database:', err);
});

app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
