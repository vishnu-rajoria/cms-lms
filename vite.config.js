import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    console.log("Mode is : " + mode);
    return {
        base: "http://localhost/cslab-app/cms/public/build",
        esbuild: {
            // drop: ["console", "debugger"],
            drop: mode === "production" ? ["console", "debugger"] : [],
        },
        plugins: [
            laravel({
                input: "resources/js/app.jsx",
                refresh: true,
            }),
            react(),
        ],
    };
});
