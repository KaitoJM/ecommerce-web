// tailwind.config.ts
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: ["./app/**/*.{vue,js,ts}", "./components/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
