
development = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'passoword',
  database: process.env.MYSQL_DATABASE || 'orm_example',
  host: process.env.MYSQL_HOST || 'localhost',
  dialect: 'mysql',
};

test = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'passoword',
  database: process.env.MYSQL_DATABASE || 'orm_example',
  host: process.env.MYSQL_HOST || 'localhost',
  dialect: 'mysql',
};

production = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'passoword',
  database: process.env.MYSQL_DATABASE || 'orm_example',
  host: process.env.MYSQL_HOST || 'localhost',
  dialect: 'mysql',
};

module.exports = {
  development,
  test,
  production,
};