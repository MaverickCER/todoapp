Below is a structured README template to guide your submission. It highlights the implementation details of your project, including the core functionality, setup instructions, and direct links to components.

---

# Full-Stack Todo List App

This project is a full-stack Todo List application built using **Next.js**, **Express.js**, **Prisma**, **MySQL**, and **Tailwind CSS**. It features basic CRUD operations for tasks, including creating, editing, deleting, and marking tasks as completed or not completed.

## Project Overview

- **Front-End**: Next.js (App Router)
- **Back-End**: Express.js with Prisma ORM
- **Database**: MySQL
- **UI**: Tailwind CSS
- **Technologies**: TypeScript

## Features

### 1. Home View

- Displays a list of tasks with **Title**, **Checkbox/Toggler** for completed status, and a **Delete Button**.
- Shows a summary of tasks: `"Tasks: X"`, `"Completed: Y of X"`.
- Task cards are clickable, leading to the **Edit Task Page**.
- **Create Task** button navigates to the task creation form.

### 2. Create/Edit Task Page

- **Form** with fields:
  - **Title** (required)
  - **Color** (selectable options: red, blue, green)
- **Create Task**: Adds a new task and redirects to the Home View.
- **Edit Task**: Updates an existing task and redirects to the Home View.
- Tasks can be discarded if the user navigates back without saving.

### 3. Additional Features

- Toggle a task’s completion status directly from the Home View.
- Delete tasks with a confirmation prompt before removal.

## Installation and Setup

### 1. **Back-End** (Express.js with Prisma)

- **Clone the Repository**:

  ```bash
  git clone <your-repo-url>
  cd backend
  ```

- **Install Dependencies**:

  ```bash
  npm install
  ```

- **Configure Database**:

  - Ensure you have MySQL installed and running.
  - Create a `.env` file in the root directory with the following content:

  ```env
  DATABASE_URL="mysql://user:password@localhost:3306/todo_app"
  ```

- **Run Database Migrations**:

  ```bash
  npx prisma migrate dev --name init
  ```

- **Start the Server**:

  ```bash
  npm run dev
  ```

- The API will be running at `http://localhost:5000`.

### 2. **Front-End** (Next.js with Tailwind CSS)

- **Clone the Repository**:

  ```bash
  git clone <your-repo-url>
  cd frontend
  ```

- **Install Dependencies**:

  ```bash
  npm install
  ```

- **Start the Development Server**:

  ```bash
  npm run dev
  ```

- The front-end will be running at `http://localhost:3000`.

## Database Schema (Prisma)

The `Task` model in `schema.prisma` looks as follows:

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  color     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## API Endpoints

The back-end provides the following API routes:

- `GET /tasks`: Fetches a list of all tasks.
- `POST /tasks`: Creates a new task.
- `PUT /tasks/:id`: Edits an existing task.
- `DELETE /tasks/:id`: Deletes a task.

## Front-End Structure

### Pages

- **Home Page (`/`)**: Displays a list of tasks with options to toggle completion status, edit, or delete tasks. Includes a task summary.
- **Create Task Page (`/tasks/create`)**: A form to add new tasks.
- **Edit Task Page (`/tasks/:id`)**: A form to edit an existing task.

### Components

- **TaskCard**: Displays task details and provides interaction options (mark complete, delete, navigate to edit page).
- **TaskForm**: A reusable form component used for both creating and editing tasks.
- **TaskSummary**: Displays the task summary on the home page.

### UI & Styles

Tailwind CSS is used for styling to ensure a clean, responsive UI. Key design considerations include:

- **Responsiveness**: The layout adjusts smoothly for various screen sizes.
- **Reusable Components**: `TaskCard` and `TaskForm` are designed to be reusable.

## How to Use

1. **Home View**: You will see the list of tasks with checkboxes for completion status. You can create, edit, or delete tasks.
2. **Create/Edit Task**: You can create or edit tasks through the forms. The title is required, and you can select a color for each task.
3. **Toggle Task Completion**: On the Home View, you can toggle the task's completion status with a checkbox.
4. **Delete Task**: You will be prompted for confirmation before deleting a task.

## GitHub Repositories

- **Frontend**: [Frontend Repository Link]
- **Backend**: [Backend Repository Link]

## Project Setup

### Steps for Database Initialization (Prisma)

1. Clone the backend repository.
2. Ensure that MySQL is running and create a database for the project.
3. Add the correct `DATABASE_URL` in the `.env` file.
4. Run Prisma migration to set up the database tables.
5. Start the backend server.

### Steps for Running the Frontend

1. Clone the frontend repository.
2. Install dependencies with `npm install`.
3. Start the Next.js app using `npm run dev`.
4. The app will be available at `http://localhost:3000`.

---

## Conclusion

This app demonstrates your ability to implement a full-stack Todo List application with clean and modular code. You can interact with the tasks, add, edit, delete, and track their completion status. Feel free to explore the project and submit it for review!

---

You can update the links to the front-end and back-end repositories once you have them available.
