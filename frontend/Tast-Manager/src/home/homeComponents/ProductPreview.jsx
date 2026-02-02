// "use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";

const tasks = [
  {
    title: "Design System Update",
    status: "completed",
    priority: "high",
    progress: 100,
    assignees: ["JD", "SK"],
  },
  {
    title: "API Integration",
    status: "in-progress",
    priority: "high",
    progress: 65,
    assignees: ["MR", "AL"],
  },
  {
    title: "User Testing",
    status: "in-progress",
    priority: "medium",
    progress: 40,
    assignees: ["EW"],
  },
  {
    title: "Documentation",
    status: "pending",
    priority: "low",
    progress: 0,
    assignees: ["TC", "JD"],
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    color: "bg-green-100 text-green-700",
  },
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    color: "bg-blue-100 text-blue-700",
  },
  pending: {
    icon: AlertCircle,
    label: "Pending",
    color: "bg-amber-100 text-amber-700",
  },
};

const priorityConfig = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

export default function ProductPreview() {
  return (
    <section id="preview" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            See TaskFlow in action
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A clean, intuitive interface designed for productivity. No clutter, just results.
          </p>
        </motion.div>

        {/* Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded-full" />
              <span className="text-sm text-muted-foreground">John Doe</span>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Tasks", value: "24" },
                { label: "Completed", value: "18" },
                { label: "In Progress", value: "4" },
                { label: "Pending", value: "2" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-secondary/50 rounded-xl p-4"
                >
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              {tasks.map((task, index) => {
                const StatusIcon = statusConfig[task.status].icon;
                return (
                  <motion.div
                    key={task.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-background rounded-xl border border-border hover:border-foreground/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <StatusIcon className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[task.status].color}`}
                          >
                            {statusConfig[task.status].label}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${priorityConfig[task.priority]}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Progress Bar */}
                      <div className="hidden sm:flex items-center gap-2 w-32">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${task.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-full bg-foreground rounded-full"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {task.progress}%
                        </span>
                      </div>

                      {/* Assignees */}
                      <div className="flex -space-x-2">
                        {task.assignees.map((assignee) => (
                          <div
                            key={assignee}
                            className="w-8 h-8 bg-secondary border-2 border-background rounded-full flex items-center justify-center text-xs font-medium text-foreground"
                          >
                            {assignee}
                          </div>
                        ))}
                      </div>

                      <button className="p-1 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// import { motion } from "framer-motion";
// import {
//   CheckCircle2,
//   Clock,
//   AlertCircle,
//   MoreHorizontal,
// } from "lucide-react";

// const tasks = [
//   {
//     title: "Design System Update",
//     status: "completed",
//     priority: "high",
//     progress: 100,
//     assignees: ["JD", "SK"],
//   },
//   {
//     title: "API Integration",
//     status: "in-progress",
//     priority: "high",
//     progress: 65,
//     assignees: ["MR", "AL"],
//   },
//   {
//     title: "User Testing",
//     status: "in-progress",
//     priority: "medium",
//     progress: 40,
//     assignees: ["EW"],
//   },
//   {
//     title: "Documentation",
//     status: "pending",
//     priority: "low",
//     progress: 0,
//     assignees: ["TC", "JD"],
//   },
// ];

// const statusConfig = {
//   completed: {
//     icon: CheckCircle2,
//     label: "Completed",
//     color: "bg-green-100 text-green-700",
//   },
//   "in-progress": {
//     icon: Clock,
//     label: "In Progress",
//     color: "bg-blue-100 text-blue-700",
//   },
//   pending: {
//     icon: AlertCircle,
//     label: "Pending",
//     color: "bg-amber-100 text-amber-700",
//   },
// };

// const priorityConfig = {
//   high: "bg-red-100 text-red-700",
//   medium: "bg-amber-100 text-amber-700",
//   low: "bg-green-100 text-green-700",
// };

// export default function ProductPreview() {
//   return (
//     <section id="preview" className="py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center max-w-2xl mx-auto mb-16"
//         >
//           <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
//             See TaskFlow in action
//           </h2>
//           <p className="text-lg text-muted-foreground text-pretty">
//             A clean, intuitive interface designed for productivity. No clutter, just results.
//           </p>
//         </motion.div>

//         {/* Product Preview */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
//         >
//           {/* Header Bar */}
//           <div className="flex items-center justify-between px-6 py-4 border-b border-border">
//             <div className="flex items-center gap-4">
//               <div className="flex gap-2">
//                 <div className="w-3 h-3 rounded-full bg-red-400" />
//                 <div className="w-3 h-3 rounded-full bg-amber-400" />
//                 <div className="w-3 h-3 rounded-full bg-green-400" />
//               </div>
//               <span className="text-sm font-medium text-foreground">
//                 Dashboard
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-secondary rounded-full" />
//               <span className="text-sm text-muted-foreground">John Doe</span>
//             </div>
//           </div>

//           {/* Dashboard Content */}
//           <div className="p-6">
//             {/* Stats Row */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//               {[
//                 { label: "Total Tasks", value: "24" },
//                 { label: "Completed", value: "18" },
//                 { label: "In Progress", value: "4" },
//                 { label: "Pending", value: "2" },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={stat.label}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                   className="bg-secondary/50 rounded-xl p-4"
//                 >
//                   <p className="text-sm text-muted-foreground">{stat.label}</p>
//                   <p className="text-2xl font-bold text-foreground mt-1">
//                     {stat.value}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Tasks List */}
//             <div className="space-y-3">
//               {tasks.map((task, index) => {
//                 const StatusIcon = statusConfig[task.status].icon;
//                 return (
//                   <motion.div
//                     key={task.title}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                     className="flex items-center justify-between p-4 bg-background rounded-xl border border-border hover:border-foreground/20 transition-colors"
//                   >
//                     <div className="flex items-center gap-4">
//                       <StatusIcon className="w-5 h-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium text-foreground">
//                           {task.title}
//                         </p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span
//                             className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[task.status].color}`}
//                           >
//                             {statusConfig[task.status].label}
//                           </span>
//                           <span
//                             className={`text-xs px-2 py-0.5 rounded-full ${priorityConfig[task.priority]}`}
//                           >
//                             {task.priority}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       {/* Progress Bar */}
//                       <div className="hidden sm:flex items-center gap-2 w-32">
//                         <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
//                           <motion.div
//                             initial={{ width: 0 }}
//                             whileInView={{ width: `${task.progress}%` }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.8, delay: 0.3 }}
//                             className="h-full bg-foreground rounded-full"
//                           />
//                         </div>
//                         <span className="text-xs text-muted-foreground">
//                           {task.progress}%
//                         </span>
//                       </div>

//                       {/* Assignees */}
//                       <div className="flex -space-x-2">
//                         {task.assignees.map((assignee) => (
//                           <div
//                             key={assignee}
//                             className="w-8 h-8 bg-secondary border-2 border-background rounded-full flex items-center justify-center text-xs font-medium text-foreground"
//                           >
//                             {assignee}
//                           </div>
//                         ))}
//                       </div>

//                       <button className="p-1 text-muted-foreground hover:text-foreground">
//                         <MoreHorizontal className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
