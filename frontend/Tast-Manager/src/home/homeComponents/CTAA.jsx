import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
];

export default function CTAA() {
  const navigate = useNavigate();
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-secondary/50" />

      {/* Animated Glow 1 */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.12, 0.25, 0.12],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-foreground/10 rounded-full blur-3xl"
      />

      {/* Animated Glow 2 */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.18, 0.08],
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-foreground/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Heading */}
          <motion.h2
            variants={item}
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            Ready to transform your team&apos;s productivity?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
          >
            Join over 10,000 teams already using TaskFlow to deliver results
            faster.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={item}>
            <motion.button
              onClick={() =>navigate("/signup")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 12px 30px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="px-8 py-4 text-base font-medium bg-foreground text-background rounded-xl inline-flex items-center gap-2"
            >
              Start Your  Trial
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Benefits */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-6 mt-10"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


