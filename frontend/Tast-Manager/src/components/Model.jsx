// import React from "react";

// const Model = ({ children, isOpen, onClose, title }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full  p-4 overflow-x-hidden overflow-y-auto bg-black/20 bg-opacity-50">
//       <div className="relative p-4 w-full max-w-2xl max-h-full">
//         {/* Modal content */}
//         <div className=" relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
//           {/* Modal header */}
//           <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t dark:border-gray-600">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//               {title}
//             </h3>
//             <button
//               type="button"
//               className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
//               onClick={onClose}
//             >
//               <svg
//                 className="w-3 h-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 1 6 6m0 0 6 6m7 7l6-6M7 7l-6 6"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="p-4 md:p-5 space-y-4">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Model;


import React from "react";

const Model = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      
      {/* Modal container */}
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body (scrollable area) */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Model;
