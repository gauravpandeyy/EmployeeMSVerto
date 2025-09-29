import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';
import employeeService from './services/employeeService';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch employees
  const fetchEmployees = async (search = '') => {
    try {
      setLoading(true);
      const data = await employeeService.getAllEmployees(search);
      setEmployees(data.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEmployees(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Open modal for adding
  const handleAddClick = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (selectedEmployee) {
        // Update existing employee
        await employeeService.updateEmployee(selectedEmployee._id, formData);
        toast.success('Employee updated successfully!');
      } else {
        // Create new employee
        await employeeService.createEmployee(formData);
        toast.success('Employee added successfully!');
      }
      
      handleCloseModal();
      fetchEmployees(searchQuery);
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.deleteEmployee(id);
        toast.success('Employee deleted successfully!');
        fetchEmployees(searchQuery);
      } catch (error) {
        toast.error(error.message || 'Failed to delete employee');
      }
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Employee Management System</h1>
      </header>

      <div className="container">
        <div className="actions-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, email, or position..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <button onClick={handleAddClick} className="btn btn-primary">
            + Add Employee
          </button>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading employees...</p>
          </div>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        employee={selectedEmployee}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;