import { useEffect, useState } from "react";
import { baseURL } from "@/Env";
import axios from "axios";
import { formatMySqlTimestampTime } from "../Helpers/TimeHelper";

export default function Notification({ userId, ...props }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [currentNotification, setCurrentNotification] = useState({});
    const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
    console.log("get notification for user " + userId);

    function getUserNotification(userId) {
        axios
            .post(route("get.user.notification"), { userId: userId })
            .then((response) => {
                console.log(response.data);
                if (response.data.length > 0) {
                    setCurrentNotification(
                        response.data[currentNotificationIndex]
                    );
                } else {
                    setCurrentNotification({});
                }
                setNotifications(response.data);
            });
    }

    function toggleNotificationSidebar() {
        setShowNotifications(!showNotifications);
        if (showNotifications) {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";
        }
    }

    function actionHandler(event, action) {
        event.preventDefault();
        console.log(action);

        if (action.type == "axios") {
            if (action.method == "post") {
                console.log("sending data : ");

                let requestData = Object.assign(action.data, {
                    notificationId: currentNotification.id,
                    action: action.routeName,
                });

                console.log(requestData);
                axios
                    .post(route(action.routeName), requestData)
                    .then((response) => {
                        console.log(response);
                        if (response.data.status == "success") {
                            console.log(
                                "status in response is " + response.data.status
                            );
                            setNotifications({
                                ...notifications.splice(
                                    currentNotificationIndex,
                                    1
                                ),
                            });
                            setCurrentNotification(
                                notifications[currentNotificationIndex]
                            );
                            // if(currentNotificationIndex<notifications.length-2){
                            //     setCurrentNotificationIndex(
                            //         currentNotificationIndex + 1
                            //     );
                            //     setCurrentNotification(
                            //         notifications[currentNotificationIndex + 1]
                            //     );
                            // }
                        }
                    });
            }
        }
    }

    useEffect(() => {
        getUserNotification(userId);
    }, []);
    return (
        <>
            <div className="relative w-[30px] h-[30px] mt-4 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    width="30px"
                    onClick={() => toggleNotificationSidebar()}
                >
                    <path d="m13.58 11.6-1.33-2.18V6.33A4.36 4.36 0 0 0 10 2.26a2.45 2.45 0 0 0 0-.38A1.94 1.94 0 0 0 8 0a1.94 1.94 0 0 0-2 1.88 1.64 1.64 0 0 0 0 .38 4.36 4.36 0 0 0-2.25 4.07v3.09L2.42 11.6a1.25 1.25 0 0 0 1.06 1.9h1.77A2.68 2.68 0 0 0 8 16a2.68 2.68 0 0 0 2.75-2.5h1.77a1.25 1.25 0 0 0 1.06-1.9zM7.25 1.88A.7.7 0 0 1 8 1.25a.7.7 0 0 1 .75.63 6 6 0 0 0-.75 0 5.9 5.9 0 0 0-.75 0zM8 14.75a1.44 1.44 0 0 1-1.5-1.25h3A1.44 1.44 0 0 1 8 14.75zm-4.52-2.5 1.34-2.17.18-.31V6.33a4 4 0 0 1 .6-2.12A2.68 2.68 0 0 1 8 3.12a2.68 2.68 0 0 1 2.4 1.09 4 4 0 0 1 .6 2.12v3.44l.18.31 1.34 2.17z" />
                    <script xmlns="" />
                </svg>
                {notifications.length > 0 && (
                    <div className="absolute notification-status h-[5px] w-[5px] bg-green-400 rounded-full top-[-5px] right-3"></div>
                )}
            </div>

            {showNotifications && (
                <div className="z-50 notifications-area fixed box-border h-screen w-screen top-0 left-0 bg-black bg-opacity-50 backdrop-blur text-white">
                    <div className="notification-area-header flex justify-between items-center bg-black p-2 ps-6">
                        <h1 className="text-xl">
                            Tasks to-do
                            {notifications.length > 0 && (
                                <>
                                    ({currentNotificationIndex + 1} of{" "}
                                    {notifications.length})
                                </>
                            )}
                        </h1>
                        <div
                            className="close-notification cursor-pointer  me-6 bg-red-400 p-2 rounded-lg"
                            onClick={() => toggleNotificationSidebar()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="#fff"
                            >
                                <path
                                    d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                                    fill="#900"
                                />
                                <script xmlns="" />
                            </svg>
                        </div>
                    </div>

                    {notifications.length == 0 && (
                        <div class="text-center p-4 bg-gray-600 rounded-4 ">
                            No notification to display
                        </div>
                    )}
                    {notifications.length > 0 && (
                        <>
                            <div className="notification-area-body overflow-y-auto grid gap-1">
                                <div className="grid">
                                    {/* {JSON.stringify(notifications)} */}

                                    {currentNotification && (
                                        <>
                                            {/* {JSON.stringify(currentNotification)} */}
                                            <div className="notification grid grid-cols-[50px_1fr] gap-2 p-4">
                                                <img
                                                    src={
                                                        baseURL +
                                                        currentNotification.thumbnail_image
                                                    }
                                                    alt=""
                                                />
                                                <div className="content">
                                                    <h3 className="font-semibold">
                                                        {currentNotification.type ==
                                                        "PPCR"
                                                            ? "Profile Pic changed "
                                                            : currentNotification.type ==
                                                              "PPCRR"
                                                            ? "Profile pic rejected "
                                                            : "Not title"}

                                                        <span className="text-sm font-thin text-gray-400">
                                                            (
                                                            {" " +
                                                                formatMySqlTimestampTime(
                                                                    currentNotification.created_at
                                                                )}
                                                            )
                                                        </span>
                                                    </h3>
                                                    <p className="text-gray-400">
                                                        {
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: currentNotification.message,
                                                                }}
                                                            ></div>
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="action-links">
                                                {/* {
                                            currentNotification.stringified_actions
                                        } */}

                                                {currentNotification.stringified_actions &&
                                                    JSON.parse(
                                                        currentNotification.stringified_actions
                                                    ).map((action) => (
                                                        <a
                                                            href="#"
                                                            class="btn btn-primary rounded-0 flex justify-center my-2"
                                                            onClick={(event) =>
                                                                actionHandler(
                                                                    event,
                                                                    action
                                                                )
                                                            }
                                                        >
                                                            {action.title}
                                                        </a>
                                                    ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="notification mt-6 flex justify-between px-4">
                                <button
                                    class="btn btn-link"
                                    onClick={() => {
                                        setCurrentNotificationIndex(
                                            currentNotificationIndex - 1
                                        );
                                        setCurrentNotification(
                                            notifications[
                                                currentNotificationIndex - 1
                                            ]
                                        );
                                    }}
                                >
                                    Previous
                                </button>
                                <button
                                    class="btn btn-link"
                                    onClick={() => {
                                        setCurrentNotificationIndex(
                                            currentNotificationIndex + 1
                                        );
                                        setCurrentNotification(
                                            notifications[
                                                currentNotificationIndex + 1
                                            ]
                                        );
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
