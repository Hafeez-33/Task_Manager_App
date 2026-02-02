import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const location = useLocation(); // 🔥 important

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* 🔥 THIS IS THE FIX */}
          <motion.div
            key={location.pathname} // forces remount on route change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grow mx-5 h-[calc(100vh-61px)] overflow-y-auto scroll-smooth pb-3"
          >
            {children}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;


// import { useContext } from 'react'
// import { UserContext } from '../../context/userContext'
// import Navbar from './Navbar'
// import SideMenu from './SideMenu'

// const DashboardLayout = ({children, activeMenu}) => {
//     const {user} = useContext(UserContext)
//   return (
//     <div>
//         <Navbar activeMenu={activeMenu}/>

//         {user && (
//             <div className='flex'>
//                 <div className='max-[1080px]:hidden'>
//                     <SideMenu activeMenu={activeMenu}/>
//                 </div>

//                 <div className='grow mx-5 h-[calc(100vh-61px)] overflow-y-auto scroll-smooth pb-3'>
//                     {children}
//                 </div>
//             </div>
//         )}
//     </div>
//   )
// }

// export default DashboardLayout