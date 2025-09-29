import React from 'react';
import EmployeeForm from './EmployeeForm';

const EmployeeModal = ({ isOpen, employee, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <EmployeeForm employee={employee} onSubmit={onSubmit} onCancel={onClose} />
      </div>
    </div>
  );
};

export default EmployeeModal;