// This file sets up the React InertiaJS app
// It imports CSS and loads the InertiaJS library
// It also sets up the page title and resolves the page components
// The setup function is called to render the app
// The progress object is used to set the color of the progress bar

import "../css/app.css";
// import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

// Get the application name from environment variables or use a default
const appName = import.meta.env.VITE_APP_NAME || "CSLAB - Frontend";

// Get the base URL from environment variables
const baseURL = import.meta.env.VITE_APP_URL;

createInertiaApp({
    // Set the title of the page
    // The title is the name of the page and the app name
    title: (title) => `${title} - ${appName}`,
    // Resolve the page component
    // The page component is the React component
    // that is rendered for the given page name
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    // Set up the app
    // This function is called when the app is rendered
    // It creates a new React root and renders the app
    // with the given props
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    // Configure the progress bar
    // The progress bar is a green bar that shows
    // the progress of the page load
    progress: {
        color: "#0F0",
    },
});
