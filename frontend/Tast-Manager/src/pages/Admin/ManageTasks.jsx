import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/inputs/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuTable } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import { motion } from "framer-motion";

/* Card animation ONLY (safe for async data) */
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_ALL_TASKS,
        {
          params: {
            status: filterStatus === "ALL" ? "" : filterStatus,
          },
        }
      );

      const tasks = response.data?.tasks || [];
      const summary = response.data?.statusSummary || {};

      setAllTasks(tasks);

      setTabs([
        { label: "All", value: "ALL", count: tasks.length },
        { label: "Pending", value: "Pending", count: summary.pending || 0 },
        {
          label: "In Progress",
          value: "In-Progress",
          count: summary.inProgress || 0,
        },
        {
          label: "Completed",
          value: "Completed",
          count: summary.completedTasks || 0,
        },
      ]);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  const handleClick = (task) => {
    navigate("/admin/create-task", { state: { taskId: task._id } });
  };

  const handleDownloadReport = async () => {
    const response = await axiosInstance.get(
      API_PATHS.REPORTS.EXPORT_TASKS,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "task_details.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Manage Tasks</h2>

          <button
            className="hidden lg:flex download-btn"
            onClick={handleDownloadReport}
          >
            <LuTable />
            Download Report
          </button>
        </div>

        {/* Tabs */}
        {tabs.length > 0 && (
          <div className="mt-4">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {loading && (
            <p className="col-span-3 text-gray-500">
              Loading tasks...
            </p>
          )}

          {!loading && allTasks.length === 0 && (
            <p className="col-span-3 text-gray-500">
              No tasks found.
            </p>
          )}

          {allTasks.map((task, index) => (
            <motion.div
              key={task._id}
              variants={cardVariant}
              initial="hidden"
              animate="show"
              transition={{ delay: index * 0.05 }}
            >
              <TaskCard
                title={task.title}
                description={task.description}
                priority={task.priority}
                status={task.status}
                progress={task.progress}
                createdAt={task.createdAt}
                dueDate={task.dueDate}
                assignedTo={
                  Array.isArray(task.assignedTo)
                    ? task.assignedTo.map((u) => u.profileImageUrl)
                    : []
                }
                attachmentCount={task.attachments?.length || 0}
                completedTodoCount={task.completedTodoCount || 0}
                todoChecklist={task.todoChecklist || []}
                onClick={() => handleClick(task)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;


// import React from "react";
// import DashboardLayout from "../../components/inputs/DashboardLayout";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosinstance";
// import { API_PATHS } from "../../utils/apiPath";
// // import { LuFileSpreadsheert } from "react-icons/lu";
// import { LuTable } from "react-icons/lu";
// import { useEffect, useState } from "react";
// import TaskStatusTabs from "../../components/TaskStatusTabs";
// import TaskCard from "../../components/Cards/TaskCard";

// const ManageTasks = () => {
//   const [allTasks, setAllTasks] = useState([]);
//   const [tabs, setTabs] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("ALL");

//   const navigate = useNavigate();

//   const getAllTasks = async () => {
//     try {
//       const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
//         params: {
//           status: filterStatus === "ALL" ? "" : filterStatus,
//         },
//       });

//       setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

//       // Map statusSummary data with fixed labels and order
//       // const statusSummary = response.data?.statusSummary || {};
//       // const statusArray = [
//       //   { label: "All", count: statusSummary.all || 0 },
//       //   { label: "Pending", count: statusSummary.pendingTask || 0 },
//       //   { label: "In Progress", count: statusSummary.inProgress || 0 },
//       //   { label: "Completed", count: statusSummary.completed || 0 },
//       // ];

//       // const statusArray = [
//       //   { label: "All", value: "ALL", count: statusSummary.all || 0 },
//       //   {
//       //     label: "Pending",
//       //     value: "Pending",
//       //     count: statusSummary.pendingTask || 0,
//       //   },
//       //   {
//       //     label: "In Progress",
//       //     value: "In-Progress",
//       //     count: statusSummary.inProgress || 0,
//       //   },
//       //   {
//       //     label: "Completed",
//       //     value: "Completed",
//       //     count: statusSummary.completed || 0,
//       //   },
//       // ];

//       // const statusArray = [
//       //   { label: "All", count: allTasks.all },
//       //   { label: "Pending", count: statusSummary.pending || 0 },
//       //   { label: "In Progress", count: statusSummary.inProgress || 0 },
//       //   { label: "Completed", count: statusSummary.completed || 0 },
//       // ];

//       const statusSummary = response.data?.statusSummary || {};

//       const statusArray = [
//         {
//           label: "All",
//           value: "ALL",
//           count: response.data?.tasks?.length || 0, // ✅ 
//         },
//         {
//           label: "Pending",
//           value: "Pending",
//           count: statusSummary.pending || statusSummary.pendingTasks || 0,
//         },
//         {
//           label: "In Progress",
//           value: "In-Progress",
//           count: statusSummary.inProgress || statusSummary.inProgressTasks || 0,
//         },
//         {
//           label: "Completed",
//           value: "Completed",
//           count: statusSummary.completedTasks || 0,
//         },
//       ];
//       //  pendingTasks,
//       //   inProgressTasks,
//       //   completedTasks
      
//       setTabs(statusArray);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const handleClick = (taskData) => {
//     navigate("/admin/create-task", { state: { taskId: taskData._id } });
//   };

//   // download task report
//   const handleDownloadReport = async () => {
//     try {
//       const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
//         responseType: "blob",
//       });
//       // Create a URL for the blob
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "task_details.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading expense details:", error);
//       toast.error("Failed to download expense details. Please try again.");
//     }
//   };

//   useEffect(() => {
//     getAllTasks(filterStatus);
//     return () => {};
//   }, [filterStatus]);

//   return (
//     <DashboardLayout activeMenu="Manage Tasks">
//       <div className="my-5">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between">
//           <div className="flex items-center justify-between gap-3">
//             <h2 className="text-xl md:text-xl font-medium">Manage Tasks</h2>

//             <button
//               className="flex lg:hidden download-btn"
//               onClick={handleDownloadReport}
//             >
//               <LuTable className="text-lg" />
//               DownloadReport
//             </button>
//           </div>

//           {/* {tabs?.[0]?.count > 0 && ( */}
//           {tabs.length > 0 && (
//             <div className="flex items-center gap-3">
//               <TaskStatusTabs
//                 tabs={tabs}
//                 activeTab={filterStatus}
//                 setActiveTab={setFilterStatus}
//               />

//               <button
//                 className="hidden lg:flex download-btn"
//                 onClick={handleDownloadReport}
//               >
//                 <LuTable className="text-lg" />
//                 DownloadReport
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           {allTasks?.map((item, index) => (
//             <TaskCard
//               key={item._id}
//               title={item.title}
//               description={item.description}
//               priority={item.priority}
//               status={item.status}
//               progress={item.progress}
//               createdAt={item.createdAt}
//               dueDate={item.dueDate}
//               assignedTo={
//                 Array.isArray(item.assignedTo)
//                   ? item.assignedTo.map((item) => item.profileImageUrl)
//                   : []
//               }
//               attachmentCount={item.attachments?.length || 0}
//               completedTodoCount={item.completedTodoCount || 0}
//               todoChecklist={item.todoChecklist || []}
//               onClick={() => {
//                 handleClick(item);
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default ManageTasks;
