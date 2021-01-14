const express = require('express');
const app = express();
const path = require('path');

const userRoute = require('./routes/user');
const userService = require('./services/user');

const cors = require('cors');
app.use(cors());

app.use(express.json());

//Routing
app.use('/api/fetch', userRoute);
app.use('/api', (req, res) => {
  userService.initialize();
});

app.listen(5000, () => {
  console.log('Server is running on port: 5000\nhttp://localhost:5000/api/fetch')
});