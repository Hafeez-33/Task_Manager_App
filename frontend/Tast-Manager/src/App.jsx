import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/login';
import ManageTasks from './pages/Admin/ManageTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';
import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
import PrivateROute from './routes/PrivateROute';



const App = () => {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />

          {/* /* Admin Routes */}
          <Route element={<PrivateROute allowedRoled={["admin"]}/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>} />
          <Route path="/admin/tasks" element={<ManageTasks/>} />
          <Route path="/admin/create-task" element={<CreateTask/>} />
          <Route path="/admin/users" element={<ManageUsers/>} />


          {/* /* User Routes */}
          <Route element={<PrivateROute allowedRoled={["admin"]}/>}/>
          <Route path="/user/dashboard" element={<UserDashboard/>} />
          <Route path="/user/tasks" element={<MyTasks/>} />
          <Route path="/user/tasks-details/:id" element={<ViewTaskDetails/>} />
          

       </Routes>
      </Router>
    </div>
  )
}

export default App