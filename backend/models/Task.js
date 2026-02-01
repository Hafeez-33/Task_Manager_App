const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Completed"],
      default: "Pending",
    },
    duedate: { type: Date, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachment: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Can store file metadata or URL
    todoChecklist: { todoSchema }, // Array of sub-tasks
    progress: { type: Number, default: 0 }, // Percentage of completion
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields)
);

module.exports = mongoose.model("Task", taskSchema);
