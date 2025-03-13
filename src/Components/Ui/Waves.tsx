"use client";

import { motion } from "framer-motion";

const AnimatedWaves = () => {
  return (
    <div className="w-full h-auto mt-auto">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 490"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition duration-300 ease-in-out delay-150"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="57%" x2="100%" y2="43%">
            <stop offset="5%" stopColor="#00d084"></stop>
            <stop offset="95%" stopColor="#7bdcb5"></stop>
          </linearGradient>
        </defs>

        <motion.path
          d="M 0,500 L 0,93 C 56.45,68.22 112.91,43.44 180,57 C 247.08,70.55 324.81,122.42 388,137 C 451.18,151.57 499.83,128.83 546,106 C 592.16,83.16 635.83,60.21 700,57 C 764.16,53.78 848.80,70.30 912,73 C 975.19,75.69 1016.93,64.57 1064,59 C 1111.06,53.42 1163.44,53.40 1227,60 C 1290.55,66.59 1365.27,79.79 1440,93 L 1440,500 L 0,500 Z"
          fill="url(#gradient)"
          fillOpacity="0.4"
          animate={{ y: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M 0,500 L 0,218 C 62.56,206.11 125.13,194.23 185,192 C 244.86,189.76 302.02,197.18 359,214 C 415.97,230.81 472.75,257.02 527,250 C 581.24,242.97 632.96,202.73 695,189 C 757.03,175.26 829.39,188.05 893,197 C 956.60,205.94 1011.47,211.06 1078,211 C 1144.52,210.93 1222.72,205.69 1285,206 C 1347.27,206.30 1393.63,212.15 1440,218 L 1440,500 L 0,500 Z"
          fill="url(#gradient)"
          fillOpacity="0.53"
          animate={{ y: [0, -10, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M 0,500 L 0,343 C 79.84,334.67 159.68,326.35 212,321 C 264.31,315.64 289.09,313.24 340,329 C 390.90,344.75 467.94,378.67 535,379 C 602.05,379.32 659.12,346.05 717,332 C 774.87,317.94 833.55,323.10 898,318 C 962.44,312.89 1032.65,297.50 1098,310 C 1163.34,322.49 1223.81,362.85 1280,373 C 1336.18,383.14 1388.09,363.07 1440,343 L 1440,500 L 0,500 Z"
          fill="url(#gradient)"
          fillOpacity="1"
          animate={{ y: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default AnimatedWaves;