import { motion } from "framer-motion";
import { Zap, Lock, Users, Settings, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized performance ensures your team never waits. Every action is instant.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption, SOC 2 compliance, and role-based access control.",
  },
  {
    icon: Users,
    title: "Built for Teams",
    description:
      "From 5 to 5,000 members. Scales seamlessly as your organization grows.",
  },
  {
    icon: Settings,
    title: "Highly Customizable",
    description:
      "Tailor workflows, statuses, and fields to match how your team works.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Insights",
    description:
      "Make informed decisions with real-time analytics and trend reports.",
  },
];

/* Animation variants */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative py-24 bg-foreground text-background overflow-hidden"
    >
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-background/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-sans text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Why teams choose TaskFlow
          </h2>
          <p className="text-lg text-background/70 text-pretty">
            Join thousands of teams who have transformed their productivity.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              variants={card}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0px 20px 40px rgba(255,255,255,0.08)",
              }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className={`p-6 rounded-2xl border border-background/10 hover:border-background/30 transition-colors ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 8, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-12 h-12 bg-background/10 rounded-xl flex items-center justify-center mb-4"
              >
                <reason.icon className="w-6 h-6 text-background" />
              </motion.div>

              <h3 className="font-sans text-lg font-semibold mb-2">
                {reason.title}
              </h3>
              <p className="text-background/70">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


// import { motion } from "framer-motion";
// import { Zap, Lock, Users, Settings, TrendingUp } from "lucide-react";

// const reasons = [
//   {
//     icon: Zap,
//     title: "Lightning Fast",
//     description:
//       "Optimized performance ensures your team never waits. Every action is instant.",
//   },
//   {
//     icon: Lock,
//     title: "Enterprise Security",
//     description:
//       "Bank-grade encryption, SOC 2 compliance, and role-based access control.",
//   },
//   {
//     icon: Users,
//     title: "Built for Teams",
//     description:
//       "From 5 to 5,000 members. Scales seamlessly as your organization grows.",
//   },
//   {
//     icon: Settings,
//     title: "Highly Customizable",
//     description:
//       "Tailor workflows, statuses, and fields to match how your team works.",
//   },
//   {
//     icon: TrendingUp,
//     title: "Data-Driven Insights",
//     description:
//       "Make informed decisions with real-time analytics and trend reports.",
//   },
// ];

// export default function WhyChooseUs() {
//   return (
//     <section id="why-us" className="py-24 bg-foreground text-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center max-w-2xl mx-auto mb-16"
//         >
//           <h2 className="font-sans text-3xl sm:text-4xl font-bold mb-4 text-balance">
//             Why teams choose TaskFlow
//           </h2>
//           <p className="text-lg text-background/70 text-pretty">
//             Join thousands of teams who have transformed their productivity.
//           </p>
//         </motion.div>

//         {/* Reasons Grid */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {reasons.map((reason, index) => (
//             <motion.div
//               key={reason.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className={`p-6 rounded-2xl border border-background/10 hover:border-background/30 transition-colors ${
//                 index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
//               }`}
//             >
//               <div className="w-12 h-12 bg-background/10 rounded-xl flex items-center justify-center mb-4">
//                 <reason.icon className="w-6 h-6 text-background" />
//               </div>
//               <h3 className="font-sans text-lg font-semibold mb-2">{reason.title}</h3>
//               <p className="text-background/70">{reason.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
