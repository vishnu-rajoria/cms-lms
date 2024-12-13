import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);
    const [fieldType, setFieldType] = useState(type);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="relative">
            <textarea
                {...props}
                className={
                    "rounded-md border-gray-300 border-none shadow-sm focus:outline-none focus:ring-0 focus:outline-1 focus:outline-indigo-500  dark:bg-gray-900 px-2 dark:text-slate-300 max-h-[100px] min-h-[100px] " +
                    className
                }
                ref={localRef}
            ></textarea>
        </div>
    );
});
