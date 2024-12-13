export default function IconGroup({ imagesURL, className, max = 5, ...props }) {
    return (
        <div className={"flex items-center gap-1 " + className}>
            {imagesURL.map((imageURL, index) => {
                if (max > index) {
                    return (
                        <div
                            key={"image-icon-" + index}
                            className={
                                index == 0
                                    ? "w-[40px] h-[40px] border-2 rounded-full overflow-hidden"
                                    : "w-[40px] h-[40px] border-2 rounded-full overflow-hidden ml-[-10px]"
                            }
                        >
                            <img
                                className="w-[40px] h-[40px] object-cover "
                                src={imageURL}
                            ></img>
                        </div>
                    );
                }
            })}
            {max < imagesURL.length ? (
                <div className="text-gray-500 dark:text-gray-200">
                    +{imagesURL.length - max}
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
