# Full-Stack Todo List App Documentation

## Overview

This document outlines the implementation of a **Full-Stack Todo List App** built with **Next.js**, **Express.js**, **Prisma**, and **MySQL** using **TypeScript** for the backend and frontend, and **Tailwind CSS** for styling. The app provides basic functionality for managing tasks, allowing users to add, edit, mark as completed, and delete tasks.

---

## Features

### 1. **Home View**

The **Home View** displays a list of tasks and provides the following:

- **Task List:**
  - Each task is displayed with:
    - **Title** of the task.
    - A checkbox or toggle to mark the task as **Completed** or **Not Completed**.
    - A **Delete** button to remove the task.
  
- **Task Summary:**
  - A summary showing the total number of tasks and the number of completed tasks, e.g., "Tasks: X" and "Completed: Y of X".

- **Create Task:**
  - A button to navigate to the **Create Task Page** for adding new tasks.

- **Task Navigation:**
  - Clicking on a task card navigates to the **Edit Task Page**.

- **Toggle Completion Status**:
  - Users can toggle a task's completion status directly on the **Home View**.
  
- **Delete Task**:
  - Deleting a task requires a confirmation prompt.

### 2. **Create/Edit Task Page**

The **Create/Edit Task Page** provides a form with the following fields:

- **Title (required)**: The task title is a required field.
- **Color**: A selectable color option (e.g., red, blue, green) to assign a color to the task.
- This form was created as a reusable component.

#### Behavior:
- **Create Task**:
  - Saves a new task and redirects the user to the **Home View**.
  
- **Edit Task**:
  - Updates an existing task and redirects the user to the **Home View**.

- **Navigation**:
  - Navigating back without saving discards any changes made to the task.

### 3. **Additional Features**

- **Localization:**
  - Clicking on the Globe to the right of the Todo App logo will allow you to change the **localization settings**.

---

## Technical Requirements

### 1. **Front-End**: **Next.js** (App Router)

- **Responsiveness**: Ensure the app is responsive and the UI is clean.
- **Reusable Components**:
  - **Tasks**: Display tasks with details and actions.
  - **Forms**: Create and edit tasks using reusable forms.
  - **Dialogs**: Open modals easily with semantic html.
  
- **Figma Design**: Follow the provided [Figma Design](https://www.figma.com/design/zHgJzVHfhuN720CjjSGRXQ/Todo-App-Test-Task?node-id=0-1&t=dcgTs4OsZGTxsIJj-1).

### 2. **Back-End**: **Express.js**

- **REST API Endpoints**:
  - `GET /tasks`: Retrieve the list of tasks.
  - `POST /tasks`: Create a new task.
  - `PUT /tasks/:id`: Update an existing task.
  - `DELETE /tasks/:id`: Delete a task.

### 3. **Database**: **Prisma** with **MySQL**

- **Schema**:
  - **Tasks** includes:
    - `id` (Primary Key)
    - `title` (string)
    - `color` (string)
    - `completed` (boolean)
    - `createdAt` (timestamp)
    - `updatedAt` (timestamp)
    - For more information, be sure to check out `./server/prisma/schema.prisma`
  
- **Database Setup**:
  - Use **Prisma** to define the schema and interact with the MySQL database.

### 4. **Best Practices**

- **Code Structure**: Code is clean and modular, following industry best practices. I also included eslint and prettier configs with vscode setting overrides to enforce a consistent style throughout the project. A lot of clean code comes down to familiarity, so getting everyone on the same page, producing code in similar patterns allows us to focus on what matters.
- **Validation & Error Handling**: Validation is handled through zod while error handling is done through a custom logger. I am particularly happy with this logger because it can automatically send errors to the developers and records when a function is executed, with which arguements, and what the return value was. This approach has proven useful in produuction environments where speed is prioritized.

---
  
### 5. **Setup Instructions**:
1. Environment Setup
- Go to /client/.env.template and follow the links to set up your enviornment variables
- Go to /server/.env.tempalte and follow the links to set up your environment variables
- note that shared variables can be copy/pasted between the two files

2. First Time Start
- Open a terminal window to ./server and execute `npm run setup`
- Open a terminal window to ./client and execute `npm run setup`

3. Loading the site
- Open your browser to `http://localhost:3002`

---

## Time Management

The programming work for this task was done in 5 hours and 52 minutes thanks to cross project components like the dialog, useSemanticDialog, useTaskContext, etc. The express server took less than an hour and is based on production servers. I stripped the security measures and converted to TypeScript to ensure smooth operation in development and comply with requirements. I have spent an additional 3 hours reviewing and writing documentation, understanding the user journey, and testing to ensure a smooth start up process. Overall, I'm very happy with how this project turned out and think it's a good representation of my current skillsets. If I had more time, I'd integrate docker to simplify the startup and deployment process. I'd also add drag and drop support and a sort by option to the list so that users can order their Todos however they like. Finally, the current system creates anonymous users to preserve sessions and prevent users from accessing tasks created by others. I'd expand on this functionality by creating an exit-intent popup to have the user provide their email so that they can access their todo list from other devices. If I could redo anything, I'd probably make commits as I go along to better show my process.

Thank you for your time and consideration!
