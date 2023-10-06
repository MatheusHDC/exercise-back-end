const express = require('express');
const cacauTrybe = require('./cacautrybe');

const app = express();

app.get('/chocolates', async (req, res) => {
  const chocolates = await cacauTrybe.getAllChocolates();
  res.status(200).json({ chocolates });
});

app.get('/chocolates/total', async (req, res) => {
  const chocolates = await cacauTrybe.getAllChocolates();
  return res.status(200).json({ totalChocolates: chocolates.length });
});

app.get('/chocolates/search', async (req, res) => {
  const { name } = req.query;
  const chocolates = await cacauTrybe.findChocolateByName(name);
  res.status(chocolates.length === 0 ? 404 : 200)
    .json(chocolates);
})

module.exports = app;