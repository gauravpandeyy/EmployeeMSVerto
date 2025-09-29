const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employee.controller');
const {
  createEmployeeValidator,
  updateEmployeeValidator,
  idValidator,
  searchValidator,
} = require('../validators/employee.validator');

router
  .route('/')
  .get(searchValidator, getAllEmployees)
  .post(createEmployeeValidator, createEmployee);

router
  .route('/:id')
  .get(idValidator, getEmployeeById)
  .put(updateEmployeeValidator, updateEmployee)
  .delete(idValidator, deleteEmployee);

module.exports = router;