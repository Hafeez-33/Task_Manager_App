

import { motion } from "framer-motion";
import { CheckSquare, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#integrations" },
    { label: "Changelog", href: "#changelog" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Documentation", href: "#docs" },
    { label: "Help Center", href: "#help" },
    { label: "API Reference", href: "#api" },
    { label: "Status", href: "#status" },
  ],
  Legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Security", href: "#security" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#twitter", label: "Twitter" },
  { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
  { icon: Github, href: "#github", label: "GitHub" },
];

export default function Footerr() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-foreground">
                TaskFlow
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The modern task management platform for teams. Assign, track, and
              deliver with confidence.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-sans font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


// import { motion } from "framer-motion";
// import { CheckSquare, Twitter, Linkedin, Github } from "lucide-react";

// const footerLinks = {
//   Product: [
//     { label: "Features", href: "#features" },
//     { label: "Pricing", href: "#pricing" },
//     { label: "Integrations", href: "#integrations" },
//     { label: "Changelog", href: "#changelog" },
//   ],
//   Company: [
//     { label: "About", href: "#about" },
//     { label: "Blog", href: "#blog" },
//     { label: "Careers", href: "#careers" },
//     { label: "Contact", href: "#contact" },
//   ],
//   Resources: [
//     { label: "Documentation", href: "#docs" },
//     { label: "Help Center", href: "#help" },
//     { label: "API Reference", href: "#api" },
//     { label: "Status", href: "#status" },
//   ],
//   Legal: [
//     { label: "Privacy", href: "#privacy" },
//     { label: "Terms", href: "#terms" },
//     { label: "Security", href: "#security" },
//   ],
// };

// const socialLinks = [
//   { icon: Twitter, href: "#twitter", label: "Twitter" },
//   { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
//   { icon: Github, href: "#github", label: "GitHub" },
// ];

// export default function Footerr() {
//   return (
//     <footer className="py-16 border-t border-border">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-5 gap-12">
//           {/* Brand Column */}
//           <div className="lg:col-span-2">
//             <a href="/" className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
//                 <CheckSquare className="w-5 h-5 text-background" />
//               </div>
//               <span className="text-xl font-bold text-foreground">
//                 TaskFlow
//               </span>
//             </a>
//             <p className="text-muted-foreground mb-6 max-w-sm">
//               The modern task management platform for teams. Assign, track, and
//               deliver with confidence.
//             </p>
//             {/* Social Links */}
//             <div className="flex items-center gap-4">
//               {socialLinks.map((social) => (
//                 <motion.a
//                   key={social.label}
//                   href={social.href}
//                   whileHover={{ scale: 1.1 }}
//                   className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
//                   aria-label={social.label}
//                 >
//                   <social.icon className="w-5 h-5" />
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* Links Columns */}
//           {Object.entries(footerLinks).map(([category, links]) => (
//             <div key={category}>
//               <h4 className="font-sans font-semibold text-foreground mb-4">{category}</h4>
//               <ul className="space-y-3">
//                 {links.map((link) => (
//                   <li key={link.label}>
//                     <a
//                       href={link.href}
//                       className="text-muted-foreground hover:text-foreground transition-colors"
//                     >
//                       {link.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-sm text-muted-foreground">
//             &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
//           </p>
//           <div className="flex items-center gap-6">
//             <a
//               href="#privacy"
//               className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//             >
//               Privacy Policy
//             </a>
//             <a
//               href="#terms"
//               className="text-sm text-muted-foreground hover:text-foreground transition-colors"
//             >
//               Terms of Service
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
