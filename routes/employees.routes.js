const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getRandomEmployee,
  getEmployeeById,
  postEmployee,
  putEmployee,
  deleteEmployee,
} = require('../controllers/employees.controller');

router.get('/employees', getAllEmployees);

router.get('/employees/random', getRandomEmployee);

router.get('/employees/:id', getEmployeeById);

router.post('/employees', postEmployee);

router.put('/employees/:id', putEmployee);

router.delete('/employees/:id', deleteEmployee);

module.exports = router;
