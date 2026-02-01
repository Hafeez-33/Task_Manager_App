import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import SignUp from "./pages/auth/SignUp";
// import Login from "./pages/auth/login";
import Login from "./pages/auth/Login";
import ManageTasks from "./pages/Admin/ManageTasks";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";

import UserDashboard from "./pages/User/UserDashboard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";

import PrivateROute from "./routes/PrivateROute";
import UserProvider, { UserContext } from "./context/userContext";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* /* Admin Routes */}
            <Route element={<PrivateROute allowedRoled={["admin"]} />} >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            </Route>

            {/* /* User Routes */}
            <Route element={<PrivateROute allowedRoled={["admin"]} />} >
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            
            <Route
              path="/user/tasks-details/:id"
              element={<ViewTaskDetails />}
            />
            </Route>

            {/* /* Default Route */}
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>


      <Toaster
        toastOptions={{
          className: "",
          style:{
            fontSize: "14px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const {user,loading} = useContext(UserContext);

  if(loading)
    return <Outlet />

  if(!user){
    return <Navigate to="/login" />;
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />;

};