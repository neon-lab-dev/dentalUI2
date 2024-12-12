import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Amiri: ["Amiri", "serif"],
        Poppins: ["Poppins", "sans-serif"],
      },

      colors: {
        black: "#000",
        primary: {
          10: "#FF7F50",
        },
        secondary: {
          10: "#ADD8E6",
          20 : "#DCDCDC",
          30 : "#F5F5DC"
        },
        neutral: {
          10: "#333333",
          15 : "#101010",
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(180deg, #FF7F50 0%, #F07F38 90.13%)',
        'orange-gradient' : 'linear-gradient(180deg, rgba(255, 127, 80, 0.00) 0%, #D04B1A 100%)',
        'gradient-black' : 'linear-gradient(270deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)',
        'services-hero-gradient' : "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
        'convenient-dental-care' : 'linear-gradient(0deg, rgba(51, 14, 0, 0.70) 0%, rgba(51, 14, 0, 0.70) 100%)'
      },
      animation: {
        marquee: "marquee 20s linear infinite", // Changed from 10s to 20s to slow down
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
  }
  },
  plugins: [],
} satisfies Config;
