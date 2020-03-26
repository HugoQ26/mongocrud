const express = require('express');
const router = express.Router();
const {
  getAllDepartments,
  getRandomDepartment,
  getDepartmentById,
  postDepartment,
  putDepartment,
  deleteDepartment,
} = require('../controllers/departments.controller');

router.get('/departments', getAllDepartments);

router.get('/departments/random', getRandomDepartment);

router.get('/departments/:id', getDepartmentById);

router.post('/departments', postDepartment);

router.put('/departments/:id', putDepartment);

router.delete('/departments/:id', deleteDepartment);

module.exports = router;
