const Task = require("../models/Task");

//@desc    Get all tasks{admin:all,user:only assigned tasks}
//@route   GET /api/tasks
//@access  Private
// const getTasks = async (req, res) => {
//   try {
//     const { status } = req.query;
//     let filter = {};

//     if (status) {
//       filter.status = status;
//     }

//     let tasks;

//     if (req.user.role === "admin") {
//       tasks = await Task.find(filter).populate(
//         "assignedTo",
//         "name email profileImageUrl"
//       );
//     } else {
//       tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
//         "assignedTo",
//         "name email profileImageUrl"
//       );
//     }

//     //add completed todechecklist count to eacj task
//     tasks = await Promise.all(
//       tasks.map(async (task) => {
//         const completedCount = task.todoChecklist.filter(
//           (item) => item.completed
//         ).length;
//         return { ...task._doc, completedTodoCount: completedCount };
//       })
//     );

//     //status summary counts
//     const allTasks = await Task.countDocuments(
//       req.user.role !== "admin" ? {} : { assignedTo: req.user._id },
//     );

//     const pendingTasks = await Task.countDocuments({
//         ...filter,
//         status: "Pending",
//         ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
//     });

//     const inProgressTasks = await Task.countDocuments({
//         ...filter,
//         status: "in progress",
//         ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
//     })

//     const completedTasks = await Task.countDocuments({
//         ...filter,
//         status: "Completed",
//         ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
//     })

//     return res.status(200).json({
//         tasks,
//         statusSummary: {
//             all: allTasks,
//             pendingTasks,
//             inProgressTasks,
//             completedTasks
//         }
//     })
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "server error", error: error.message });
//   }
// };

const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;

    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    }

    // add completed todo checklist count
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = Array.isArray(task.todoChecklist)
          ? task.todoChecklist.filter((item) => item.completed).length
          : 0;
        return { ...task._doc, completedTodoCount: completedCount };
      })
    );

    // status summary counts
    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "in progress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.status(200).json({
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//@desc get task by id
//@route GET /api/tasks/:id
//@access Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    if (!task) {
      return res.status(400).json({
        message: "Task not found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//@desc create a new task{admin only}
//@route POST /api/tasks
//@access Private
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      duedate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      duedate,
      assignedTo,
      createdBy: req.user._id,
      todoChecklist,
      attachments,
    });

    return res.status(201).json({ message: "Task Created Successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//@desc update a task details
//@route PUT /api/tasks/:id
//@access Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).json({
        message: "Task not found",
      });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.duedate = req.body.duedate || task.duedate;
    task.assignedTo = req.body.assignedTo || task.assignedTo;
    task.attachment = req.body.attachments || task.attachments;

    if (req.bodu.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "assignedTo must be an array of user IDs" });
      }
      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await task.save();
    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//@desc delete a task{admin only}
//route DELETE /api/tasks/:id
//@access Private
const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//@desc update task status
//@route PUT{PATCH} /api/tasks/:id/status
//@access Private
const updateTaskStatus = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//@desc update task checklist
//@route PUT{PATCH} /api/tasks/:id/todo
//@access Private
const updateTaskChecklist = async (req, res) => {
  try {
    const { todoChecklist } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(400).json({ message: "Task not found" });

    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "not authorized to update checklist" });
    }

    task.todoChecklist = todoChecklist;

    //Auto-update progress based on completed checklist items
    const completedCount = todoChecklist.filter(
      (item) => item.completed
    ).length;
    const totalItems = task.todoChecklist.length;
    task.progress =
      totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    //Auto-update task on completed if all items are checked
    if (task.progress === 100) {
      task.status = "Completed";
    } else if (task.progress > 0) {
      task.status = "in-progress";
    } else {
      task.status = "Pending";
    }

    await task.save();
    const updatedTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    res.json({
      message: "Task checklist updated",
      task: updatedTask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//@ dashboard data {admin only}
//@route GET /api/tasks/dashboard-data
//@access Private
const getDashboardData = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const overdueTasks = await Task.countDocuments({
      status: { $ne: "Completed" },
      duedate: { $lt: new Date() },
    });

    // ensure all possible statuses are included
    const taskStatuses = ["Pending", "in progress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      {
        $group: {
          _id: "$Status",
          cousnt: { $sum: 1 },
        },
      },
    ]);

    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, ""); //remove spaces for response keys
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistribution["All"] = totalTasks; //add total count to taskdistribution

    const taskPriorities = ["low", "medium", "high"];
    const taskPriorityLevelsRaw = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    // fetch recent 10 tasks
    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority duedate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

//@desc dashboard data{user-specific}
// @route GET /api/tasks/user-dashboard-data
// @access Private
const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; //only fetch data for logged-in user

    //fetch statistics for user-specific tasks
    const totalTasks = await Task.countDocuments({ assignedTo: userId });
    const pendingTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Pending",
    });
    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Completed",
    });
    const overdueTasks = await Task.countDocuments({
      assignedTo: userId,
      status: { $ne: "Completed" },
      duedate: { $lt: new Date() },
    });

    //task distribution by status
    const taskStatuses = ["Pending", "in progress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      { $match: { assignedTo: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, ""); //remove spaces for response keys
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistribution["All"] = totalTasks; //add total count to taskdistribution

    //task distribution by priority
    const taskPriorities = ["low", "medium", "high"];
    const taskPriorityLevelsRaw = await Task.aggregate([
      { $match: { assignedTo: userId } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskPriorityLevels = taskPriorities.reduce((acc, priority) =>{
      acc[priority] =taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    },{});

    //fetch recent 10 task for the logged-in user
    const recentTasks = await Task.find({ assignedTo: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority duedate createdAt");

      res.status(200).json({
        statistics: {
          totalTasks,
          pendingTasks,
          completedTasks,
          overdueTasks,
        },
        charts: {
          taskDistribution,
          taskPriorityLevels,
        },
        recentTasks,
      });

  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};
