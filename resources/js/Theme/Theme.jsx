import { useEffect, useState } from "react";

import { ThemeContext } from "@/Context/ThemeContext";

export default function Theme({ children }) {
    let initialMode = "dark";
    const [themeMode, setThemeMode] = useState(initialMode);

    /**
     * Get the initial theme mode from localStorage
     * If the previously saved theme mode exists in localStorage, set initialMode to that value
     * @returns {string} the initial theme mode
     */
    function getInitialMode() {
        let mode = undefined;
        let previouslySavedMode = localStorage.getItem("current-theme-mode");
        if (previouslySavedMode !== null) {
            mode = previouslySavedMode;
        }
        return mode;
    }

    /**
     * Set the theme mode to the given value
     * @param {string} theme the theme mode to set, either "dark" or "light"
     */
    function setTheme(theme) {
        // update the theme state variable
        setThemeMode(theme);
        localStorage.setItem("current-theme-mode", theme);
        // add the invert class to the theme switcher button
        // so that it look like it is inverted
        document.querySelector("#theme-switcher-btn").classList.add("invert");
    }

    /**
     * Toggle the theme mode between dark and light
     * This function updates the themeMode state variable
     * and updates the "current-theme-mode" value in localStorage
     * @returns {void}
     */
    function toggleThemeHandler() {
        if (themeMode == "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    useEffect(() => {
        // set the initial theme mode when the component mounts
        if (getInitialMode()) {
            initialMode = getInitialMode();
        }
        setTheme(initialMode);
    }, []);

    return (
        <>
            {/*
                This component is a provider for the theme mode
                It wraps the app in a div with the id "app-theme"
                and passes the theme mode and toggle theme handler
                to the components inside it
            */}
            <ThemeContext.Provider value={{ themeMode, toggleThemeHandler }}>
                <div id="app-theme" className={themeMode}>
                    {children}
                </div>
            </ThemeContext.Provider>
        </>
    );
}
