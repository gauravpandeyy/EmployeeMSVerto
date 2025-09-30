# Employee Management System

A full-stack Employee Management System built with:

-  **Frontend**: Vite + React
- **Backend**: Node.js + Express + MongoDB

---

##  Project Structure

employeems/
├── client/ # Frontend (React + Vite)
├── api/ # Backend (Express + MongoDB)
└── README.md

 API Endpoints
| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| GET    | `/api/employees`              | Get all employees     |
| GET    | `/api/employees?search=query` | Search employees      |
| GET    | `/api/employees/:id`          | Get employee by ID    |
| POST   | `/api/employees`              | Create new employee   |
| PUT    | `/api/employees/:id`          | Update employee       |
| DELETE | `/api/employees/:id`          | Delete employee       |
| GET    | `/health`                     | Health check endpoint |

Frontend Setup Instructions:
cd client
npm install
npm run dev

Backend Setup Instruction:
cd api
npm install
node server.js
