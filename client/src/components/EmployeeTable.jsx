import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return (
      <div className="employee-table-container">
        <div className="empty-state">
          <h3>No Employees Found</h3>
          <p>Start by adding your first employee</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(employee)}
                    className="btn btn-primary btn-small"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee._id)}
                    className="btn btn-danger btn-small"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;