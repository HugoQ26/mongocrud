const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

const dbHostAtlas = process.env.DB_HOST_ATLAS;
const dbHostLocal = process.env.DB_HOST_LOCAL;
const dbHost = dbHostAtlas || dbHostLocal;

const client = new MongoClient(dbHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully connected to the database');
    const db = client.db('Kodilla');
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/api', employeesRoutes);
    app.use('/api', departmentsRoutes);
    app.use('/api', productsRoutes);
    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    });

    app.listen('8000', () => {
      console.log('Server is running on port: 8000');
    });
  }
});
