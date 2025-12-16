export const BASE_URL = "http://localhost:8000";

//utils/apipaths.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Register a new user(Admin or Member)
    LOGIN: "/api/auth/login", // Authenticate user and get jwt token
    GET_PROFILE: "/api/auth/profile", // get logged in user profile
  },
  USERS: {
    GET_ALL_USERS: "/api/users", // get all users {admin only}
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //get user by id
    CREATE_USER: "/api/users", //create a new user {admin only}
    UPDATE_USER: (userId) => `/api/users/${userId}`, //update user details
    DELETE_USER: (userId) => `/api/users/${userId}`, //delete a user
  },

  TASKS: {
    DATA: "/api/tasks/dashboard-data", //fet dashboard data
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data", //ger user dashboard data
    GET_ALL_TASKS: "/api/tasks", //get all tasks {admin:all, user:only assgned tasks}
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, //get task by id
    CREATE_TASK: "/api/tasks", //create a new task {admin only}
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, //update task details
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, //delete a task {admin only}
  },

  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks", //Download all tasks as excel/pdf report
    EXPORT_USER: "/api/reports/export/users", //download user-task report
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/images/upload-image",
  },
};
