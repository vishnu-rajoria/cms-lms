export default function Loading({
    message = "Loading",
    isVisible = true,
    ...props
}) {
    return (
        <div
            className={"text-white text-center" + (isVisible ? "" : " hidden")}
        >
            <div
                className="spinner-border flex flex-col gap-2 justify-center items-center"
                role="status"
            >
                <span className="visually-hidden">{message}</span>
                <div className="animate-spin h-5 w-5">
                    <div className=" w-[20px] h-[20px] rounded-full border-r-2 border-white "></div>
                </div>
            </div>
        </div>
    );
}
