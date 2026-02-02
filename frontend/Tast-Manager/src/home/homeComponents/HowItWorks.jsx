import { motion } from "framer-motion";
import { UserPlus, ListPlus, Rocket } from "lucide-react";

/* Animation Variants */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Your Team",
    description:
      "Sign up and invite your team members. Set up roles and permissions in minutes.",
  },
  {
    icon: ListPlus,
    number: "02",
    title: "Add Your Tasks",
    description:
      "Create tasks with priorities, deadlines, and checklists. Assign them to team members.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Track & Deliver",
    description:
      "Monitor progress in real-time. Get insights from the analytics dashboard and ship faster.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/50 relative overflow-hidden">
      {/* Soft background glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-foreground/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Get started in three simple steps
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            No complicated setup. No lengthy onboarding. Just create, assign, and track.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Animated Connector Line (Desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-border origin-left"
          />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative text-center group"
            >
              {/* Icon Container */}
              <div className="relative z-10 mx-auto w-20 h-20 bg-card rounded-2xl border border-border flex items-center justify-center mb-6 group-hover:border-foreground/30 transition-colors">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  className="text-foreground"
                >
                  <step.icon className="w-8 h-8" />
                </motion.div>
              </div>

              {/* Step Number */}
              <span className="inline-block text-sm font-bold text-muted-foreground mb-2">
                Step {step.number}
              </span>

              {/* Content */}
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


// import { motion } from "framer-motion";
// import { UserPlus, ListPlus, Rocket } from "lucide-react";

// const steps = [
//   {
//     icon: UserPlus,
//     number: "01",
//     title: "Create Your Team",
//     description:
//       "Sign up and invite your team members. Set up roles and permissions in minutes.",
//   },
//   {
//     icon: ListPlus,
//     number: "02",
//     title: "Add Your Tasks",
//     description:
//       "Create tasks with priorities, deadlines, and checklists. Assign them to team members.",
//   },
//   {
//     icon: Rocket,
//     number: "03",
//     title: "Track & Deliver",
//     description:
//       "Monitor progress in real-time. Get insights from the analytics dashboard and ship faster.",
//   },
// ];

// export default function HowItWorks() {
//   return (
//     <section id="how-it-works" className="py-24 bg-secondary/50">
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
//             Get started in three simple steps
//           </h2>
//           <p className="text-lg text-muted-foreground text-pretty">
//             No complicated setup. No lengthy onboarding. Just create, assign, and track.
//           </p>
//         </motion.div>

//         {/* Steps */}
//         <div className="grid md:grid-cols-3 gap-8 relative">
//           {/* Connector Line - Desktop */}
//           <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-border" />

//           {steps.map((step, index) => (
//             <motion.div
//               key={step.number}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.15 }}
//               className="relative text-center"
//             >
//               {/* Icon Container */}
//               <div className="relative z-10 mx-auto w-20 h-20 bg-card rounded-2xl border border-border flex items-center justify-center mb-6">
//                 <motion.div
//                   whileHover={{ rotate: 10, scale: 1.1 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <step.icon className="w-8 h-8 text-foreground" />
//                 </motion.div>
//               </div>

//               {/* Step Number */}
//               <span className="inline-block text-sm font-bold text-muted-foreground mb-2">
//                 Step {step.number}
//               </span>

//               {/* Content */}
//               <h3 className="font-sans text-xl font-semibold text-foreground mb-3">
//                 {step.title}
//               </h3>
//               <p className="text-muted-foreground max-w-xs mx-auto">
//                 {step.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
