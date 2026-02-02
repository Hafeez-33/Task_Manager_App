

import { motion } from "framer-motion";
import {
  Shield,
  Users,
  ListTodo,
  Flag,
  CheckSquare,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Admin and User roles with granular permissions. Control who can create, assign, and manage tasks.",
  },
  {
    icon: Users,
    title: "Task Assignment",
    description:
      "Easily assign tasks to team members. Track ownership and accountability at a glance.",
  },
  {
    icon: ListTodo,
    title: "Status Tracking",
    description:
      "Monitor tasks through Pending, In Progress, and Completed stages with visual indicators.",
  },
  {
    icon: Flag,
    title: "Priority Levels",
    description:
      "Set Low, Medium, or High priority to help your team focus on what matters most.",
  },
  {
    icon: CheckSquare,
    title: "Checklist Progress",
    description:
      "Break tasks into subtasks with checklists. Track completion percentage in real-time.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Visualize team performance with charts, metrics, and actionable insights.",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel Export",
    description:
      "Export your data to Excel for reporting, analysis, or sharing with stakeholders.",
  },
];

export default function Featuress() {
  return (
    <section id="features" className="py-24">
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
            Everything you need to manage tasks effectively
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Powerful features designed for teams of all sizes. From startups to
            enterprises.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-foreground/20 transition-all"
            >
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



// import { motion } from "framer-motion";
// import {
//   Shield,
//   Users,
//   ListTodo,
//   Flag,
//   CheckSquare,
//   BarChart3,
//   FileSpreadsheet,
// } from "lucide-react";

// const features = [
//   {
//     icon: Shield,
//     title: "Role-Based Access",
//     description:
//       "Admin and User roles with granular permissions. Control who can create, assign, and manage tasks.",
//   },
//   {
//     icon: Users,
//     title: "Task Assignment",
//     description:
//       "Easily assign tasks to team members. Track ownership and accountability at a glance.",
//   },
//   {
//     icon: ListTodo,
//     title: "Status Tracking",
//     description:
//       "Monitor tasks through Pending, In Progress, and Completed stages with visual indicators.",
//   },
//   {
//     icon: Flag,
//     title: "Priority Levels",
//     description:
//       "Set Low, Medium, or High priority to help your team focus on what matters most.",
//   },
//   {
//     icon: CheckSquare,
//     title: "Checklist Progress",
//     description:
//       "Break tasks into subtasks with checklists. Track completion percentage in real-time.",
//   },
//   {
//     icon: BarChart3,
//     title: "Analytics Dashboard",
//     description:
//       "Visualize team performance with charts, metrics, and actionable insights.",
//   },
//   {
//     icon: FileSpreadsheet,
//     title: "Excel Export",
//     description:
//       "Export your data to Excel for reporting, analysis, or sharing with stakeholders.",
//   },
// ];

// export default function Featuress() {
//   return (
//     <section id="features" className="py-24">
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
//             Everything you need to manage tasks effectively
//           </h2>
//           <p className="text-lg text-muted-foreground text-pretty">
//             Powerful features designed for teams of all sizes. From startups to
//             enterprises.
//           </p>
//         </motion.div>

//         {/* Features Grid */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.05 }}
//               whileHover={{ y: -4 }}
//               className="group p-6 bg-card rounded-2xl border border-border hover:border-foreground/20 transition-all"
//             >
//               <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
//                 <feature.icon className="w-6 h-6" />
//               </div>
//               <h3 className="font-sans text-lg font-semibold text-foreground mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-muted-foreground">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
