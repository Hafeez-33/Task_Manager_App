// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import DashboardLayout from "../../components/inputs/DashboardLayout";
// import { useLocation, useNavigate } from "react-router-dom";
// import { PRIORITY_DATA } from "../../utils/data";
// import SelectDropdown from "../../components/inputs/SelectDropdown";
// import SelectUsers from "../../components/inputs/SelectUsers";
// import TodoListInput from "../../components/inputs/TodoListInput";
// import AddAttachmentsInput from "../../components/inputs/AddAttachmentsInput";
// import axiosInstance from "../../utils/axiosinstance";
// import { API_PATHS } from "../../utils/apiPath";
// import toast from "react-hot-toast";
// import moment from "moment";
// import Modal from "../../components/Model";
// import DeleteAlert from "../../components/DeleteAlert";
// import { LuTrash2 } from "react-icons/lu";

// /* 🔹 Animation Variants */
// const pageVariant = {
//   hidden: { opacity: 0, y: 20 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
// };

// const sectionVariant = {
//   hidden: { opacity: 0, y: 15 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.35, ease: "easeOut" },
//   },
// };

// const CreateTask = () => {
//   const location = useLocation();
//   const { taskId } = location.state || {};
//   const navigate = useNavigate();

//   const [taskData, setTaskData] = useState({
//     title: "",
//     description: "",
//     priority: "Low",
//     dueDate: "",
//     assignedTo: [],
//     todoChecklist: [],
//     attachments: [],
//   });

//   const [error, setErrors] = useState("");
//   const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);

//   const handleValueChange = (field, value) => {
//     setTaskData((prev) => ({ ...prev, [field]: value }));
//   };

//   const clearData = () => {
//     setTaskData({
//       title: "",
//       description: "",
//       priority: "Low",
//       dueDate: "",
//       assignedTo: [],
//       todoChecklist: [],
//       attachments: [],
//     });
//   };

//   const createTask = async () => {
//     setLoading(true);
//     try {
//       const todolist = taskData.todoChecklist.map((item) => ({
//         text: item,
//         completed: false,
//       }));

//       await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
//         title: taskData.title,
//         description: taskData.description,
//         priority: taskData.priority,
//         duedate: taskData.dueDate,
//         assignedTo: taskData.assignedTo,
//         todoChecklist: todolist,
//         attachments: taskData.attachments,
//       });

//       toast.success("Task Created Successfully");
//       clearData();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Task creation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateTask = async () => {
//     setLoading(true);
//     try {
//       const todolist = taskData.todoChecklist.map((item) => {
//         const prev = currentTask?.todoChecklist || [];
//         const found = prev.find((t) => t.text === item);
//         return { text: item, completed: found?.completed || false };
//       });

//       await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
//         ...taskData,
//         dueDate: new Date(taskData.dueDate),
//         todoChecklist: todolist,
//       });

//       toast.success("Task Updated Successfully");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors("");

//     if (!taskData.title.trim()) return setErrors("Title is required.");
//     if (!taskData.description.trim()) return setErrors("Description is required.");
//     if (!taskData.dueDate) return setErrors("Due date is required.");
//     if (!taskData.assignedTo.length) return setErrors("Task not assigned.");
//     if (!taskData.todoChecklist.length) return setErrors("Add at least one todo.");

//     taskId ? await updateTask() : await createTask();
//   };

//   const getTaskDetailsByID = async () => {
//     const res = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
//     const task = res.data;

//     setCurrentTask(task);
//     setTaskData({
//       title: task.title,
//       description: task.description,
//       priority: task.priority,
//       dueDate: task.dueDate ? moment(task.dueDate).format("YYYY-MM-DD") : "",
//       assignedTo: task.assignedTo?.map((u) => u._id) || [],
//       todoChecklist: task.todoChecklist?.map((t) => t.text) || [],
//       attachments: task.attachments || [],
//     });
//   };

//   const deleteTask = async () => {
//     await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
//     toast.success("Task deleted");
//     navigate("/admin/tasks");
//   };

//   useEffect(() => {
//     if (taskId) getTaskDetailsByID();
//   }, [taskId]);

//   return (
//     <DashboardLayout activeMenu="Create Task">
//       <motion.div
//         variants={pageVariant}
//         initial="hidden"
//         animate="show"
//         className="mt-5"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
//           <motion.div
//             variants={sectionVariant}
//             initial="hidden"
//             animate="show"
//             className="form-card col-span-3"
//           >
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-medium">
//                 {taskId ? "Update Task" : "Create New Task"}
//               </h2>

//               {taskId && (
//                 <button
//                   onClick={() => setOpenDeleteAlert(true)}
//                   className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border"
//                 >
//                   <LuTrash2 />
//                   Delete
//                 </button>
//               )}
//             </div>

//             {/* FORM */}
//             <motion.form
//               onSubmit={handleSubmit}
//               variants={sectionVariant}
//               initial="hidden"
//               animate="show"
//             >
//               {/* All your inputs are untouched */}
//               {/* (kept exactly same as your code) */}

//               {/* Submit */}
//               {error && (
//                 <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
//               )}

//               <div className="flex justify-end mt-7">
//                 <motion.button
//                   whileTap={{ scale: 0.96 }}
//                   className="add-btn"
//                   disabled={loading}
//                 >
//                   {taskId ? "UPDATE TASK" : "CREATE TASK"}
//                 </motion.button>
//               </div>
//             </motion.form>
//           </motion.div>
//         </div>
//       </motion.div>

//       <Modal
//         isOpen={openDeleteAlert}
//         onClose={() => setOpenDeleteAlert(false)}
//         title="Delete Task"
//       >
//         <DeleteAlert
//           content="Are you sure you want to delete this task?"
//           onDelete={deleteTask}
//         />
//       </Modal>
//     </DashboardLayout>
//   );
// };

// export default CreateTask;


import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/inputs/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { PRIORITY_DATA } from "../../utils/data";
import SelectDropdown from "../../components/inputs/SelectDropdown";
import SelectUsers from "../../components/inputs/SelectUsers";
import TodoListInput from "../../components/inputs/TodoListInput";
import AddAttachmentsInput from "../../components/inputs/AddAttachmentsInput";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";
import moment from "moment";
import Modal from "../../components/Model";
import DeleteAlert from "../../components/DeleteAlert";
import { LuTrash2 } from "react-icons/lu";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "", //updated
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [error, setErrors] = useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false); //modified
  const [currentTask, setCurrentTask] = useState(null); //modified

  const handleValueChange = (field, value) => {
    setTaskData((prevData) => ({ ...prevData, [field]: value }));
  };

  const clearData = () => {
    //reset form
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "", //updated
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  //create task
  // const createTask = async () => {
  //   setLoading(true);

  //   try {
  //     const todolist = taskData.todoChecklist.map((item) => ({
  //       text: item,
  //       completed: false,
  //     }));

  //     const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
  //       ...taskData, //updated
  //       dueDate:taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
  //       todoChecklist: todolist,
  //     });

  //     toast.success("Task Created Successfully");
  //     clearData();
  //   } catch (error) {
  //     console.error("Error creating task:", error);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const createTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }));

      const payload = {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        duedate: taskData.dueDate, // 👈 DO NOT convert
        assignedTo: taskData.assignedTo,
        todoChecklist: todolist,
        attachments: taskData.attachments,
      };

      // console.log("CREATE TASK PAYLOAD 👉", payload);

      const response = await axiosInstance.post(
        API_PATHS.TASKS.CREATE_TASK,
        payload,
      );

      toast.success("Task Created Successfully");
      clearData();
    } catch (error) {
      console.error(
        "CREATE TASK ERROR 👉",
        error.response?.data || error.message,
      );
      toast.error(error.response?.data?.message || "Task creation failed");
    } finally {
      setLoading(false);
    }
  };

  //update task
  const updateTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodoChecklist.find((task) => task.text == item);
        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate), //toISOString(),
          todoChecklist: todolist,
        },
      );
      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrors(null);
    // Input validation
    if (!taskData.title.trim()) {
      setErrors("Title is required.");
      return;
    }
    if (!taskData.description.trim()) {
      setErrors("Description is required.");
      return;
    }
    if (!taskData.dueDate) {
      setErrors("Due date is required.");
      return;
    }

    if (taskData.assignedTo?.length == 0) {
      setErrors("Task not assigned to any member");
      return;
    }
    if (taskData.todoChecklist?.length === 0) {
      setErrors("Add atleast one todo task");
      return;
    }
    // if (taskId) {
    //   updateTask();
    //   return;
    // }
    // createTask();

    if (taskId) {
      await updateTask();
      // return;
    } else {
      await createTask();
    }
  };

  // get Task info by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId),
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);
        setTaskData((prevState) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : "", //updated
          // assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          assignedTo: Array.isArray(taskInfo?.assignedTo)
            ? taskInfo.assignedTo.map((item) => item?._id)
            : taskInfo?.assignedTo
              ? [taskInfo.assignedTo._id || taskInfo.assignedTo]
              : [],

          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (error) {
      // Handle error
      console.error("Error fetching user task details:", error);
    }
  };

  //delete task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      setOpenDeleteAlert(false);
      toast.success("Expense details deleted successfully");
      navigate("/admin/tasks");
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message,
      );
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID(taskId);
    }

    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create New Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>

              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title}
                onChange={({ target }) => {
                  handleValueChange("title", target.value);
                }}
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>

              <textarea
                placeholder="Describe task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-3">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>

                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>

                <input
                  placeholder="Create App UI"
                  className="form-input"
                  type="date"
                  value={taskData.dueDate}
                  onChange={({ target }) => {
                    handleValueChange("dueDate", target.value);
                  }}
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assigned To
                </label>

                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(users) => {
                    handleValueChange("assignedTo", users);
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                TODO Checklist
              </label>
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}
            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
