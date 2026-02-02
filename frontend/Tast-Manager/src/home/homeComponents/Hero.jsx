import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Users,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Animation Variants */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const stats = [
  { icon: Users, value: "10k+", label: "Active Teams" },
  { icon: CheckCircle2, value: "1M+", label: "Tasks Completed" },
  { icon: TrendingUp, value: "99%", label: "Uptime" },
];

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, 40, 0],
            y: [0, -30, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 30, 0],
            rotate: [0, -6, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-foreground/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto "
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              New: Analytics Dashboard Released
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance"
          >
            Team Task Management
            <br />
            <span className="text-muted-foreground">Made Simple</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            Assign tasks, track progress, and deliver results with role-based
            access control. The modern platform for teams that ship.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              // onClick={() =>navigate("/signup")}
              onClick={() => {
                setTimeout(() => navigate("/signup"), 150);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full sm:w-auto px-8 py-4 text-base font-medium bg-foreground text-background rounded-xl flex items-center justify-center gap-2"
            >
              Start Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="w-full sm:w-auto px-8 py-4 text-base font-medium bg-transparent border border-border text-foreground rounded-xl flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
