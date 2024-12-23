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
                        Edit
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
                                <div className="student-details-container grid grid-cols-[auto,1fr] gap-4 items-center">
                                    <img
                                        className="rounded-full border-4 border-gray-200 w-[150px] h-[150px] object-cover"
                                        src={getStudentImageURL(
                                            studentDetails.id,
                                            studentDetails.student_details
                                                .profile_pic
                                        )}
                                    />
                                    <div>
                                        <h2 className="text-xl text-green-300">
                                            {studentDetails.name}
                                        </h2>
                                        <h3>{studentDetails.email}</h3>
                                        <div>
                                            Date of Joining :
                                            {formattedMysqlDateAndTime(
                                                studentDetails.student_details
                                                    .doj
                                            )}
                                        </div>
                                        <div>
                                            {
                                                studentDetails.student_details
                                                    .school_college
                                            }
                                        </div>
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
                                            <h3 className="text-xl text-green-300 pt-6">
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
