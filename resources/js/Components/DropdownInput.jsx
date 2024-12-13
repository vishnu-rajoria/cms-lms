/**
 * DropdownInput component renders a select dropdown with provided options.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.options - Array of option objects for the dropdown.
 * @param {string} [props.className] - Additional classes for styling.
 * @returns {JSX.Element} The rendered select dropdown.
 */
export default function DropdownInput({ ...props }) {
    // Map over props.options to create an array of <option> elements
    const optionsJSX = props.options.map((option, index) => (
        // Each <option> is given a unique key and value
        <option key={option.value + "-" + index} value={option.value}>
            {/* Display the text for the option */}
            {option.text}
        </option>
    ));
    return (
        <>
            <select
                className={
                    "rounded-md border-gray-300 dark:border-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full dark:bg-gray-900 " +
                    props.className
                }
                {...props}
            >
                {optionsJSX}
            </select>
        </>
    );
}
