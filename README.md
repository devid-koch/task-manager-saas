# Task Manager SaaS

## Overview

Task Manager SaaS is a web application that allows users to manage tasks. Users can create, update, delete, and list tasks. Each task has a title, description, due date, and status. The application supports multiple users, with each user having their own set of tasks.

## Architecture

The application is built using the following technologies:

- **TypeScript**: For type-safe code.
- **Effect-TS**: For managing effects and maintaining functional programming principles.
- **Express**: For creating the RESTful API.
- **Jest**: For testing the application.

### Folder Structure

task-manager/
├── src/
│ ├── controllers/
│ │ ├── taskController.ts
│ │ └── userController.ts
│ ├── models/
│ │ └── index.ts
│ ├── services/
│ │ └── database.ts
│ ├── utils/
│ │ └── effectUtils.ts
│ │ └── validation.ts
│ ├── app.ts
│ └── server.ts
├── tests/
│ ├── taskController.test.ts
│ └── userController.test.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
└── tsconfig.json

### Design Decisions

- **Functional Programming**: The application is designed following functional programming principles to ensure immutability, pure functions, and avoiding side effects.
- **Effect-TS**: Used for handling effects and managing application state in a functional manner.
- **In-Memory Database**: Task data is stored in an in-memory database using JavaScript's `Map`.

## Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devid-koch/task-manager-saas.git
   cd task-manager-saas
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile TypeScript:
   ```bash
   npm run build
   ```

### Running the Application

1. Start the server:

   ```bash
   npm run dev
   ```

2. The server will be running at `http://localhost:8080`.

### API Endpoints

#### Users

- **Create a new user**: `POST /users`
  - Request Body: `{ "name": "string", "email": "string" }`
  - Response: `{ "message": "User created successfully", "user": { ... } }`

#### Tasks

- **Create a new task for a user**: `POST /users/:user_id/tasks`

  - Request Body: `{ "title": "string", "description": "string", "status": "string", "dueDate": "string" }`
  - Response: `{ "message": "Task created successfully" }`

- **Retrieve all tasks for a user**: `GET /users/:user_id/tasks`

  - Response: `{ "tasks": [ ... ] }`

- **Retrieve a specific task for a user**: `GET /users/:user_id/tasks/:task_id`

  - Response: `{ "task": { ... } }`

- **Update a specific task for a user**: `PUT /users/:user_id/tasks/:task_id`

  - Request Body: `{ "title": "string", "description": "string", "status": "string", "dueDate": "string" }`
  - Response: `{ "message": "Task updated successfully", "task": { ... } }`

- **Delete a specific task for a user**: `DELETE /users/:user_id/tasks/:task_id`
  - Response: `{ "message": "Task deleted successfully" }`

## Testing

### Running Tests

1. Run the test suite:

   ```bash
   npm test
   ```

2. Jest will run all the tests and display the results in the terminal.

### Test Structure

- **Unit Tests**: Tests for individual functions and components.
- **Integration Tests**: Tests for API endpoints and their interactions with the in-memory database.
