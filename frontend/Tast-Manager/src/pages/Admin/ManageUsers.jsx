import DashboardLayout from "../../components/inputs/DashboardLayout";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useEffect, useState } from "react";
import UserCard from "../../components/Cards/UserCard";
// import { toast } from "react-toastify";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //download user report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USER, {
        responseType: "blob",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      // toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">Team Members</h2>
          <button
            className="flex md:flex download-btn"
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet className="text-lg" />
            Download Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default ManageUsers;



// import DashboardLayout from "../../components/inputs/DashboardLayout";
// import axiosInstance from "../../utils/axiosinstance";
// import { API_PATHS } from "../../utils/apiPath";
// import { LuFileSpreadsheet } from "react-icons/lu";
// import { useEffect, useState } from "react";
// import UserCard from "../../components/Cards/UserCard";
// import { motion } from "framer-motion";

// const ManageUsers = () => {
//   const [allUsers, setAllUsers] = useState([]);

//   const getAllUsers = async () => {
//     try {
//       const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

//       // ✅ FIX: handle correct API response shape
//       const users =
//         response.data?.users ||
//         response.data?.data ||
//         response.data ||
//         [];

//       setAllUsers(Array.isArray(users) ? users : []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // download user report
//   const handleDownloadReport = async () => {
//     try {
//       const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USER, {
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "user_details.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading user details:", error);
//     }
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   return (
//     <DashboardLayout activeMenu="Team Members">
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="mt-5 mb-10"
//       >
//         <div className="flex md:flex-row md:items-center justify-between">
//           <h2 className="text-xl md:text-xl font-medium">Team Members</h2>
//           <button
//             className="flex md:flex download-btn"
//             onClick={handleDownloadReport}
//           >
//             <LuFileSpreadsheet className="text-lg" />
//             Download Report
//           </button>
//         </div>

//         {/* Users Grid */}
//         <motion.div
//           initial="hidden"
//           animate="show"
//           variants={{
//             hidden: { opacity: 0 },
//             show: {
//               opacity: 1,
//               transition: { staggerChildren: 0.08 },
//             },
//           }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
//         >
//           {allUsers.length > 0 ? (
//             allUsers.map((user) => (
//               <motion.div
//                 key={user._id}
//                 variants={{
//                   hidden: { opacity: 0, y: 16 },
//                   show: { opacity: 1, y: 0 },
//                 }}
//                 transition={{ duration: 0.3, ease: "easeOut" }}
//               >
//                 <UserCard userInfo={user} />
//               </motion.div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500 col-span-full">
//               No team members found.
//             </p>
//           )}
//         </motion.div>
//       </motion.div>
//     </DashboardLayout>
//   );
// };

// export default ManageUsers;