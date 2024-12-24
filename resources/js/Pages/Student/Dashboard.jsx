import { baseURL } from "@/Env";
import StudentActivityTracker from "@/Components/StudentActivityTracker";
import AuthenticatedLayout from "@/Layouts/Student/AuthenticatedLayout";
import { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import { formattedMysqlDateAndTime } from "@/Helpers/TimeHelper";
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
                    {groups.map((group, index) => {
                        return (
                            <div key={"student-activity-tracker-" + index}>
                                <h3 className="text-xl text-green-300 pt-6">
                                    Group {group.group_id}
                                </h3>

                                <StudentActivityTracker
                                    studentId={user.id}
                                    groupId={group.group_id}
                                    startingDate={"2023-12-05"}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
