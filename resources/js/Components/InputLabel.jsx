export default function InputLabel({
    value = "",
    className = "",
    children,
    prefix = "",
    postfix = "",

    ...props
}) {
    return (
        <>
            <label
                className={
                    `block text-sm font-medium text-gray-700 dark:text-gray-400 ` +
                    className
                }
            >
                {value}
            </label>
        </>
    );
}
