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

    function togglePasswordVisibility() {
        if (fieldType == "password") {
            setFieldType("text");
        } else {
            setFieldType("password");
        }
    }

    if (type == "password") {
        return (
            <div className="relative">
                <input
                    {...props}
                    type={fieldType}
                    className={
                        "rounded-md border-gray-300 dark:border-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:[color-scheme:dark] " +
                        className
                    }
                    ref={localRef}
                />

                <div
                    className="absolute top-3 right-3 dark:invert opacity-80"
                    onClick={togglePasswordVisibility}
                >
                    <img
                        className="w-[20px]"
                        src="https://www.svgrepo.com/show/521653/eye-show.svg"
                        alt=""
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative w-full">
                <input
                    {...props}
                    type={fieldType}
                    className={
                        "rounded-md border-gray-300 dark:border-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 dark:[color-scheme:dark] text-gray-400   " +
                        " " +
                        className
                    }
                    ref={localRef}
                />
            </div>
        );
    }
});
