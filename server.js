const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

const dbHostAtlas = process.env.DB_HOST_ATLAS;
const dbHostLocal = process.env.DB_HOST_LOCAL;
const dbHost = dbHostAtlas || dbHostLocal;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

// connects our backend code with the database
mongoose.connect(dbHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
