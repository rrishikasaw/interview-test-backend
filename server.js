let express = require('express');
let morgan = require('morgan');
let cors = require('cors');
const mongoose = require('mongoose');
let stores = require('./stores');

let app = express();
app.use(express.static('uploads'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
require('dotenv').config();

app.use('/api/users', require('./api/users/routes'));

app.all('*', (req, res, next) => res.status(405).json({message: 'route not implemented'}))

app.listen(process.env.PORT, async () => {
  console.log('server started');
  const client = await mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DATABASE
  })
  stores.db = client.connection.db
  console.log('atlas connected');
});
