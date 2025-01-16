import StudentActivityTracker from "@/Components/StudentActivityTracker";
import { getStudentImageURL } from "@/Helpers/ImageHelper";
import { baseURL } from "@/Env";
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDistance, formatISO, set } from "date-fns";
import axios from "axios";
import { formattedMysqlDateAndTime } from "@/Helpers/TimeHelper";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import StudentFeeHistory from "./StudentFeeHistory";
import ChangeProfilePicForm from "@/Forms/ChangeProfilePicForm";
export default function StudentProfile({ studentId, canModify }) {
    const [studentDetails, setStudentDetails] = useState({});
    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showChangeProfilePicForm, setShowChangeProfilePicForm] =
        useState(false);
    const [showFeesHistory, setShowFeesHistory] = useState(false);
    const [studentFeeHistoryData, setStudentFeeHistoryData] = useState([]);
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
                getStudentFeeHistory(studentId);
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

    function getStudentFeeHistory(studentId) {
        axios
            .get(baseURL + "/api/get-student-fees-history/" + studentId)
            .then(function (response) {
                setStudentFeeHistoryData(response.data.studentFeeHistory);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    function displayChangeProfilePictureForm() {
        alert("Change profile picture");
    }

    function studentFeeSaveSuccessHandler() {
        getStudentFeeHistory(studentId);
    }
    useEffect(() => {
        getStudentDetails(studentId);
    }, []);

    function profilePicChangeResponseHandler(response) {
        console.log("response handler");
        console.log(response);

        if (response.data.status == "success") {
            setShowModal(false);
        } else {
            alert("There is an error while changing the profile picture");
        }
    }

    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    {showChangeProfilePicForm && (
                        <ChangeProfilePicForm
                            userId={studentDetails.id}
                            userRoleId={studentDetails.role_id}
                            profilePicChangeResponseHandler={
                                profilePicChangeResponseHandler
                            }
                        />
                    )}
                    {showFeesHistory && (
                        <StudentFeeHistory
                            canModify={canModify}
                            studentDetails={studentDetails}
                            studentFeeHistoryData={studentFeeHistoryData}
                            studentFeeSaveSuccessHandler={
                                studentFeeSaveSuccessHandler
                            }
                        />
                    )}
                </div>
            </Modal>

            {Object.keys(studentDetails).length > 0 && (
                <div className="overflow-hidden bg-white dark:bg-gray-900 shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-400">
                        {
                            <>
                                <div className="student-details-container md:flex flex-cols-3  gap-4 items-start  sm:justify-start">
                                    <div
                                        className="relative rounded-full border-4 cursor-pointer border-gray-200 w-[150px] h-[150px] max-w-[150px] max-h-[150px] overflow-hidden "
                                        onClick={() => {
                                            setShowModal(true);
                                            setShowFeesHistory(false);
                                            setShowChangeProfilePicForm(true);
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
                                    <div className="student-details">
                                        <h2 className="relative text-xl font-bold text-gray-900 dark:text-green-300 flex justify-start gap-2 group">
                                            {studentDetails.name}
                                        </h2>
                                        <h3 className="group flex justify-start gap-2">
                                            {studentDetails.email}
                                            <button
                                                className="btn btn-sm btn-primary edit-btn hidden group-hover:block cursor-pointer text-sm"
                                                onClick={() =>
                                                    alert(
                                                        "Change email feature for student is comming soon!"
                                                    )
                                                }
                                            >
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
                                                className="border-0 shadow-none"
                                                type="password"
                                                label="Course Fee"
                                                value={
                                                    studentDetails
                                                        .student_details
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
                                                className="border-0 shadow-none"
                                                type="password"
                                                value={
                                                    studentDetails
                                                        .student_details
                                                        .course_fee_amount -
                                                    studentDetails
                                                        .student_details
                                                        .amount_paid -
                                                    studentDetails
                                                        .student_details
                                                        .course_fee_concession +
                                                    "    "
                                                }
                                                disabled
                                            ></TextInput>
                                        </div>
                                    </div>
                                    <div className="ms-auto">
                                        <button
                                            // href={route(
                                            //     "student.fees.history",
                                            //     studentDetails.id
                                            // )}
                                            onClick={() => {
                                                setShowModal(true);
                                                setShowFeesHistory(true);
                                                setShowChangeProfilePicForm(
                                                    false
                                                );
                                            }}
                                            className="btn btn-link"
                                        >
                                            Fee Payment history
                                        </button>
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
                                                {group.name}
                                            </h3>
                                            <StudentActivityTracker
                                                studentId={studentId}
                                                groupId={group.id}
                                                startingDate={
                                                    studentDetails
                                                        .student_details.doj
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </>
                        }
                    </div>
                </div>
            )}
        </>
    );
}
