const app = require('./app');

const PORT = 30013;

app.listen(PORT, () => {
  console.log(`API TrybeCash está sendo executada na porta ${PORT}`);
});