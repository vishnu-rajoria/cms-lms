import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "dark:border-green-400 border-gray-900 text-gray-900 dark:text-green-300 focus:border-gray-900 dark:focus:border-green-200 "
                    : "border-transparent text-gray-500 hover:border-gray-900 dark:hover:border-green-300 hover:text-gray-900 dark:hover:text-green-400 focus:border-gray-900 dark:focus:border-green-200 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
