const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  'url': process.env.DB_URL,
  'database': process.env.DB_NAME,
  'username': process.env.DB_USERNAME,
  'password': process.env.DB_PASSWORD
}