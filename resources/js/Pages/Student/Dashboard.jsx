import { baseURL } from "@/Env";
import StudentActivityTracker from "@/Components/StudentActivityTracker";
import AuthenticatedLayout from "@/Layouts/Student/AuthenticatedLayout";
import axios from "axios";
import { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import { formattedMysqlDateAndTime } from "@/Helpers/TimeHelper";
import { getStudentImageURL } from "@/Helpers/ImageHelper";
import TextInput from "@/Components/TextInput";
/**
 * The admin dashboard
 *
 * @param {object} props
 * @param {object} props.series - The data for the chart
 * @property {string} props.series.name - The name of the series
 * @property {Array} props.series.data - The data for the series
 * @returns {React.ReactElement} The admin dashboard component
 */
export default function Dashboard({}) {
    const user = usePage().props.auth.user;
    const [studentDetails, setStudentDetails] = useState({});

    const [groups, setGroups] = useState([]);
    function getStudentDetails(studentId) {
        // Display a loading toast message at the bottom-right
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });
        axios
            .get(baseURL + "/api/get-student-details/" + user.id)
            .then(function (response) {
                toast.update(toastId, {
                    render: "Student details fetched Successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
                setGroups(response.data.groups);
                setStudentDetails(response.data.studentDetails);
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

    useEffect(() => {
        getStudentDetails(user.id);
    }, []);

    return (
        <AuthenticatedLayout header={<h2>Welcome {user.name}</h2>}>
            <Head title="Dashboard" />

            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-white bg-slate-900">
                    {Object.keys(studentDetails).length > 0 && (
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
                                        studentDetails.student_details.doj
                                    )}
                                </div>
                                <div class="flex gap-2 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-[20px] h-[20px] "
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M6 4H10.5M10.5 4C12.9853 4 15 6.01472 15 8.5C15 10.9853 12.9853 13 10.5 13H6L13 20M10.5 4H18M6 8.5H18"
                                            stroke="#0f0"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <script xmlns="" />
                                    </svg>
                                    Paid
                                    <TextInput
                                        className=""
                                        type="password"
                                        label="Course Fee"
                                        value={
                                            studentDetails.student_details
                                                .amount_paid + "     "
                                        }
                                        disabled
                                    ></TextInput>
                                </div>
                                <div class="flex gap-2 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-[20px] h-[20px] "
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M6 4H10.5M10.5 4C12.9853 4 15 6.01472 15 8.5C15 10.9853 12.9853 13 10.5 13H6L13 20M10.5 4H18M6 8.5H18"
                                            stroke="#0f0"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <script xmlns="" />
                                    </svg>
                                    Remaining
                                    <TextInput
                                        className=""
                                        type="password"
                                        value={
                                            studentDetails.student_details
                                                .course_fee_amount -
                                            studentDetails.student_details
                                                .amount_paid -
                                            studentDetails.student_details
                                                .course_fee_concession +
                                            "    "
                                        }
                                        disabled
                                    ></TextInput>
                                </div>
                            </div>
                        </div>
                    )}

                    {groups.map((group, index) => {
                        return (
                            <div key={"student-activity-tracker-" + index}>
                                <h3 className="text-xl text-green-300 pt-6">
                                    Group {group.group_id}
                                </h3>
                                {group.created_at}
                                <StudentActivityTracker
                                    studentId={user.id}
                                    groupId={group.group_id}
                                    startingDate={
                                        studentDetails.student_details.doj
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
