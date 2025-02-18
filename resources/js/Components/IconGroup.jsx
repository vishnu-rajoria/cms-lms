export default function IconGroup({
    imagesURL,
    className,
    max = 5,
    total,
    size = "md",
    ...props
}) {
    let postfix = 0;
    if (total) {
        if (max < total) {
            postfix = total - max;
        } else {
            postfix = total - imagesURL.length;
        }
    } else {
        if (imagesURL) {
            postfix = imagesURL.length - max;
        } else {
            postfix = "";
        }
    }

    let sizeClasses = "w-[40px] h-[40px]";

    switch (size) {
        case "sm":
            sizeClasses = "w-[20px] h-[20px] min-w-[20px] min-h-[20px]";
            break;
        case "md":
            sizeClasses = "w-[30px] h-[30px] min-w-[30px] min-h-[30px]";
            break;
        case "lg":
            sizeClasses = "w-[50px] h-[50px] min-w-[50px] min-h-[50px]";
            break;
    }
    return (
        <div className={"flex items-center gap-1 " + className}>
            {imagesURL &&
                imagesURL.map((imageURL, index) => {
                    if (max > index) {
                        return (
                            <div
                                key={"image-icon-" + index}
                                className={
                                    index == 0
                                        ? sizeClasses +
                                          " border-2 rounded-full overflow-hidden"
                                        : sizeClasses +
                                          " border-2 rounded-full overflow-hidden ml-[-10px]"
                                }
                            >
                                <img
                                    className={sizeClasses + " object-cover "}
                                    src={imageURL}
                                ></img>
                            </div>
                        );
                    }
                })}

            <div className="text-gray-500 dark:text-gray-200">
                {postfix > 0 ? `+${postfix}` : ""}
            </div>
        </div>
    );
}
