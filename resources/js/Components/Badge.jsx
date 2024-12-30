export default function Badge({ children, ...props }) {
    return (
        <span
            className={
                " transition-all select-none font-small inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 " +
                props.className
            }
        >
            {children}
        </span>
    );
}
