// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // server: {
//   //   proxy: {
//   //     "/api": {
//   //       target: "http://localhost:3000",
//   //     },
//   //   },
//   // },
// });

import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    "plugins": [react()],
    "server": {
"proxy": {
    "/api": {
        "target": "http://localhost:3000",
        "rewrite": (path) => {return path.replace(/^\/api/, '');}
    }
}
    }
});
