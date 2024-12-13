/**
 * Theme Switcher Component
 * This component uses the ThemeContext to get the current theme
 * and toggle the theme mode when the button is clicked.
 * The theme mode is stored in localStorage and retrieved when the component mounts.
 * The component renders a button with an SVG icon that toggle theme between light and dark
 * depending on the current theme mode.
 * The button is given a title attribute of "Change Theme" for accessibility.
 * @returns {JSX.Element} The theme switcher component
 */
import { useEffect, useContext } from "react";
import { ThemeContext } from "@/Context/ThemeContext";

export default function ThemeSwitcher() {
    const themeInfo = useContext(ThemeContext);
    return (
        <>
            <div
                title="Change Theme"
                id="theme-switcher-btn"
                onClick={() => themeInfo.toggleThemeHandler()}
                className="theme-switcher w-[30px] h-[30px] grid place-content-center bg-gray-200 select-none rounded-full"
            >
                <img
                    className="w-[20px]"
                    src="https://www.svgrepo.com/show/500713/switch-filled.svg"
                    alt=""
                />
            </div>
        </>
    );
}
