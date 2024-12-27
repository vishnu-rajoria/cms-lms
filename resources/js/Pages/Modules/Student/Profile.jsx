import StudentActivityTracker from "@/Components/StudentActivityTracker";
import { getStudentImageURL } from "@/Helpers/ImageHelper";
import { baseURL } from "@/Env";
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDistance, formatISO } from "date-fns";
import axios from "axios";
import { formattedMysqlDateAndTime } from "@/Helpers/TimeHelper";
export default function ManageStudents({ studentId }) {
    const [studentDetails, setStudentDetails] = useState({});
    const [groups, setGroups] = useState([]);

    function getStudentDetails(studentId) {
        // Display a loading toast message at the bottom-right
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });
        axios
            .get(baseURL + "/api/get-student-details/" + studentId)
            .then(function (response) {
                toast.update(toastId, {
                    render: "Student details fetched Successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
                setStudentDetails(response.data.studentDetails);
                setGroups(response.data.groups);
            })
            .catch(function (error) {
                toast.update(toastId, {
                    render: "Data loadeding failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            });
    }

    function displayChangeProfilePictureForm() {
        alert("Change profile picture");
    }
    useEffect(() => {
        getStudentDetails(studentId);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-xl">Student Profile</h2>

                    <Link
                        className="btn"
                        href={baseURL + "/admin/register-student"}
                    >
                        Edit Profile
                    </Link>
                </div>
            }
        >
            <Head title="Student Profile" />

            <div className="overflow-hidden bg-white dark:bg-gray-900 shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-400">
                    {/* {JSON.stringify(studentDetails)} */}

                    {groups.length > 0 &&
                        Object.keys(studentDetails).length && (
                            <>
                                <div className="student-details-container grid md:grid-cols-[auto,auto]  gap-4 items-center  sm:justify-start">
                                    <div
                                        className="relative rounded-full border-4 cursor-pointer border-gray-200 w-[150px] h-[150px] max-w-[150px] max-h-[150px] overflow-hidden"
                                        onClick={() => {
                                            displayChangeProfilePictureForm();
                                        }}
                                    >
                                        <img
                                            title="click to change profile picture"
                                            className="object-cover"
                                            src={getStudentImageURL(
                                                studentDetails.id,
                                                studentDetails.student_details
                                                    .profile_pic
                                            )}
                                        />
                                        <div className="message text-center text-white absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full grid place-content-center p-6 hover:opacity-100 opacity-0 transition-all ">
                                            Change Profile Pic
                                        </div>
                                    </div>
                                    <div className="student-details ">
                                        <h2 className="relative text-xl font-bold text-gray-900 dark:text-green-300 flex justify-start gap-2 group">
                                            {studentDetails.name}
                                            <button className="btn btn-sm btn-primary edit-btn hidden group-hover:block cursor-pointer text-sm">
                                                change
                                            </button>
                                        </h2>
                                        <h3 className="group flex justify-start gap-2">
                                            {studentDetails.email}
                                            <button className="btn btn-sm btn-primary edit-btn hidden group-hover:block cursor-pointer text-sm">
                                                change
                                            </button>
                                        </h3>
                                        <div
                                            className="flex justify-start gap-2 items-center"
                                            title="Date of joining"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-[20px] h-[20px] "
                                                viewBox="0 0 24 24"
                                                fill="#0f0"
                                            >
                                                <path
                                                    d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
                                                    stroke="#0f0"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                />
                                                <rect
                                                    x="6"
                                                    y="12"
                                                    width="3"
                                                    height="3"
                                                    rx="0.5"
                                                    fill="#000000"
                                                />
                                                <rect
                                                    x="10.5"
                                                    y="12"
                                                    width="3"
                                                    height="3"
                                                    rx="0.5"
                                                    fill="#000000"
                                                />
                                                <rect
                                                    x="15"
                                                    y="12"
                                                    width="3"
                                                    height="3"
                                                    rx="0.5"
                                                    fill="#000000"
                                                />
                                                <script xmlns="" />
                                            </svg>
                                            {formattedMysqlDateAndTime(
                                                studentDetails.student_details
                                                    .doj
                                            )}
                                        </div>
                                        {/* <div>
                                            {
                                                studentDetails.student_details
                                                    .school_college
                                            }
                                        </div> */}
                                    </div>
                                </div>
                                {groups.map((group, index) => {
                                    return (
                                        <div
                                            key={
                                                "student-activity-tracker-" +
                                                index
                                            }
                                        >
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-green-300 pt-6">
                                                Group {group.group_id}
                                            </h3>
                                            <StudentActivityTracker
                                                studentId={studentId}
                                                groupId={group.group_id}
                                                startingDate={
                                                    studentDetails
                                                        .student_details.doj
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </>
                        )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
