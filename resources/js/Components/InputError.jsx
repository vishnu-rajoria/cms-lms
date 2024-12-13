export default function InputError({
    message,
    className = "",
    isInvalid = false,
    ...props
}) {
    return message ? (
        <div
            {...props}
            className={
                isInvalid
                    ? "mt-2 text-sm text-red-600 "
                    : "mt-2 text-sm text-red-600  hidden " + className
            }
        >
            {message}
        </div>
    ) : null;
}
