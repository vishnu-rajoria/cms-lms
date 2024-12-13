import { createTheme } from "react-data-table-component";
export function CreateDarkTableTheme() {
    createTheme(
        "solarized",
        {
            text: {
                primary: "#ddd",
                secondary: "#2aa198",
            },
            background: {
                default: "rgb(17 24 39 / var(--tw-bg-opacity))",
            },
            context: {
                background: "#cb4b16",
                text: "#FFFFFF",
            },
            divider: {
                // default: "#073642",
            },
            button: {
                default: "#2aa198",
                hover: "rgba(0,0,0,.08)",
                focus: "rgba(255,255,255,.12)",
                disabled: "rgba(255, 255, 255, .34)",
            },
            sortFocus: {
                default: "#2aa198",
            },
        },
        "dark"
    );
}
