import { motion } from "framer-motion";
import { Star } from "lucide-react";

/* ---------- DATA (unchanged) ---------- */

const companies = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Stark Industries",
  "Wayne Enterprises",
];

const testimonials = [
  {
    quote:
      "TaskFlow transformed how our team works. We went from chaos to clarity in just one week.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "TechStart",
  },
  {
    quote:
      "The role-based access control is exactly what we needed. Finally, a tool that understands enterprise needs.",
    author: "Michael Torres",
    role: "Engineering Lead",
    company: "ScaleUp Inc",
  },
  {
    quote:
      "Best task management tool we have ever used. The analytics dashboard alone is worth it.",
    author: "Emily Watson",
    role: "Operations Director",
    company: "GrowthCo",
  },
];

/* ---------- ANIMATION VARIANTS ---------- */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const starPop = {
  hidden: { scale: 0, opacity: 0 },
  show: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 300,
    },
  }),
};

/* ---------- COMPONENT ---------- */

export default function SocialProof() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Company Logos */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-muted-foreground mb-8"
          >
            Trusted by teams at
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {companies.map((company) => (
              <motion.div
                key={company}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.05 }}
                className="text-lg font-semibold text-muted-foreground/60 hover:text-foreground transition-colors cursor-default"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              variants={fadeUp}
              whileHover={{
                y: -6,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-card p-6 rounded-2xl border border-border"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={starPop}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Star className="w-4 h-4 fill-foreground text-foreground" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-foreground mb-6"
              >
                “{testimonial.quote}”
              </motion.p>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}


// import { motion } from "framer-motion";
// import { Star } from "lucide-react";

// const companies = [
//   "Acme Corp",
//   "Globex",
//   "Initech",
//   "Umbrella",
//   "Stark Industries",
//   "Wayne Enterprises",
// ];

// const testimonials = [
//   {
//     quote:
//       "TaskFlow transformed how our team works. We went from chaos to clarity in just one week.",
//     author: "Sarah Chen",
//     role: "Product Manager",
//     company: "TechStart",
//   },
//   {
//     quote:
//       "The role-based access control is exactly what we needed. Finally, a tool that understands enterprise needs.",
//     author: "Michael Torres",
//     role: "Engineering Lead",
//     company: "ScaleUp Inc",
//   },
//   {
//     quote:
//       "Best task management tool we have ever used. The analytics dashboard alone is worth it.",
//     author: "Emily Watson",
//     role: "Operations Director",
//     company: "GrowthCo",
//   },
// ];

// export default function SocialProof() {
//   return (
//     <section className="py-20 bg-secondary/50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Company Logos */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-16"
//         >
//           <p className="text-sm font-medium text-muted-foreground mb-8">
//             Trusted by teams at
//           </p>
//           <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
//             {companies.map((company) => (
//               <div
//                 key={company}
//                 className="text-lg font-semibold text-muted-foreground/60 hover:text-foreground transition-colors"
//               >
//                 {company}
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Testimonials */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={testimonial.author}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-card p-6 rounded-2xl border border-border"
//             >
//               <div className="flex gap-1 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className="w-4 h-4 fill-foreground text-foreground"
//                   />
//                 ))}
//               </div>
//               <p className="text-foreground mb-6">{`"${testimonial.quote}"`}</p>
//               <div>
//                 <p className="font-semibold text-foreground">
//                   {testimonial.author}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {testimonial.role}, {testimonial.company}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
