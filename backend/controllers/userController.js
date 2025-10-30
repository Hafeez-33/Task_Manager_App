const Task = require("../models/Task");
const User = require("../models/User");

const bcrypt = require("bcryptjs");

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    // const users = await User.find({ role: "member" }).select("-password");
    const users = await User.find().select("-password");

    //add task count to each user
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "in-progress",
        });
        const completedTaskss = await Task.countDocuments({
          assignedTo: user._id,
          status: "completed",
        });
        return {
          ...user._doc, //include all existing user data
          pendingTasks,
          inProgressTasks,
          completedTaskss,
        };
      })
    );
    res.json(usersWithTaskCounts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc   Get user by ID
// @route  GET /api/users/:id
// @access Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user).console.log("not found");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// // @desc    Delete user
// // @route   DELETE /api/users/:id
// // @access  Private/Admin
// const deleteUser = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

module.exports = {
  getUsers,
  getUserById,
};
