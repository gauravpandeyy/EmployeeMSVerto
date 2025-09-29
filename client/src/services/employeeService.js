import api from '../config/api';

const employeeService = {
  // Get all employees
  getAllEmployees: async (searchQuery = '') => {
    const response = await api.get(`/employees${searchQuery ? `?search=${searchQuery}` : ''}`);
    return response.data;
  },

  // Get employee by id
  getEmployeeById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    const response = await api.post('/employees', employeeData);
    return response.data;
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  },

  // Delete employee
  deleteEmployee: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },
};

export default employeeService;