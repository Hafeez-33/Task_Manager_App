

// import React, { useContext, useEffect, useState } from "react";
// import { SIDE_MENU_ITEMS, SIDE_MENU_USER_DATA } from "../../utils/data";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// /* Animation Variants */
// const containerVariant = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//     },
//   },
// };

// const itemVariant = {
//   hidden: { opacity: 0, x: -20 },
//   show: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
// };

// const SideMenu = ({ activeMenu }) => {
//   const { user, clearUser } = useContext(UserContext);
//   const [SideMenuData, setSideMenuData] = useState([]);
//   const navigate = useNavigate();

//   const handleClick = (route) => {
//     if (route === "logout") {
//       handleLogout();
//       return;
//     }
//     navigate(route);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     clearUser();
//     navigate("/login");
//   };

//   useEffect(() => {
//     if (user) {
//       setSideMenuData(
//         user?.role === "admin" ? SIDE_MENU_ITEMS : SIDE_MENU_USER_DATA
//       );
//     }
//   }, [user]);

//   return (
//     <motion.div
//       initial={{ x: -80, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-100/50 sticky top-[61px] z-20"
//     >
//       {/* Profile Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.4 }}
//         className="flex flex-col items-center justify-center mb-7 pt-5"
//       >
//         <motion.img
//           src={user?.profileImageUrl || ""}
//           alt="Profile"
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 300 }}
//           className="w-20 h-20 bg-slate-400 rounded-full"
//         />

//         {user?.role === "admin" && (
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-[10px] font-medium text-white bg-primary px-3 rounded mt-2"
//           >
//             Admin
//           </motion.div>
//         )}

//         <h5 className="text-gray-950 font-medium mt-2">
//           {user?.name || ""}
//         </h5>
//         <p className="text-[12px] text-gray-500">
//           {user?.email || ""}
//         </p>
//       </motion.div>

//       {/* Menu Items */}
//       <motion.div
//         variants={containerVariant}
//         initial="hidden"
//         animate="show"
//         className="flex flex-col"
//       >
//         <AnimatePresence>
//           {SideMenuData.map((item, index) => {
//             const isActive = activeMenu === item.label;

//             return (
//               <motion.button
//                 key={`menu_${index}`}
//                 variants={itemVariant}
//                 whileHover={{ x: 6 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleClick(item.path)}
//                 className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 my-1 cursor-pointer relative
//                   ${
//                     isActive
//                       ? "text-primary bg-gradient-to-r from-blue-50/40 to-blue-100/60"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }`}
//               >
//                 {/* Active Indicator */}
//                 {isActive && (
//                   <motion.span
//                     layoutId="active-indicator"
//                     className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r"
//                   />
//                 )}

//                 <item.icon className="text-xl" />
//                 {item.label}
//               </motion.button>
//             );
//           })}
//         </AnimatePresence>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default SideMenu;



import React, { useContext, useEffect, useState } from 'react'
import { SIDE_MENU_ITEMS, SIDE_MENU_USER_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom'

const SideMenu = ({activeMenu}) => {
  const {user, clearUser} = useContext(UserContext);
  const [SideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) =>{
    if(route === "logout"){
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () =>{
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() =>{
    if(user){
      setSideMenuData(user?.role ==='admin' ? SIDE_MENU_ITEMS : SIDE_MENU_USER_DATA);
    }
    return () => {};
  }, [user]);


  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-100/50 sticky top-[61px] z-20'>
    <div className='flex flex-col items-center justify-center mb-7 pt-5'>
      <div className='relative'>
        <img src={user?.profileImageUrl || ""} 
        alt="Profile Image"
        className='w-20 h-20 bg-slate-400 rounded-full' />
      </div>

      {user?.role === 'admin' && (
        <div className='text-[10px] font-medium text-white bg-primary px-3 my-8.5 rounded mt-2'>
          Admin
        </div>
      )}

      <h5 className='text-gray-950 font-medium leading-2 mt-0'>
        {user?.name || ""}
      </h5>

      <p className='text-[12px] text-gray-500'>{user?.email || ""}</p>
   </div>

    {SideMenuData.map((item, index) => (
      <button
        key={`menu_${index}`}
        className={`w-full flex items-center gap-4 text-[15px] ${
          activeMenu === item.label
          ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3"
          :""
        } py-3 px-6 mg-3 cursor-pointer`}
        onClick={() => handleClick(item.path)}
      >
        <item.icon className="text-xl" />
        {item.label}
      </button>
  ))}
   </div>
  )
};

export default SideMenu