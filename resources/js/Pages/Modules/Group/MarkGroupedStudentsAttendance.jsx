import { baseURL } from "@/Env";
import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Loading from "@/Components/Loading";
import { toast } from "react-toastify";
import MarkGroupedStudentsAttendanceForm from "@/Forms/MarkGroupedStudentsAttendanceForm";
export default function MarkGroupedStudentsAttendance({
    groupId,
    selectedDate,
    ...props
}) {
    const [students, setStudents] = useState([]);
    const [isStudentDataLoaded, setIsStudentDataLoaded] = useState(false);
    /**
     * Fetches the list of students from the server and updates the state
     * with the received data
     *
     * This function displays a loading toast message at the bottom-right
     * corner of the screen while the data is being fetched. Once the data
     * is received, the toast message is updated to indicate successful
     * data loading. If an error occurs, the toast message is updated to
     * show an error message.
     */
    function getStudents(groupId) {
        // Display a loading toast message at the bottom-right
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });

        axios
            .get(baseURL + "/api/get-students/" + groupId)
            .then(function (response) {
                // Log the response from the server
                // console.log("Response from server");
                // console.log(response.data.students);
                // Update the students state with the data from the server
                setStudents(response.data.students);

                // Update the toast message to indicate successful data loading
                toast.update(toastId, {
                    render: "Data loaded Successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });

                setIsStudentDataLoaded(true);
            })
            .catch(function (error) {
                // Log the error from the server
                // console.log("Error from server");
                // console.log(error);
                // Optionally, you can update the toast to show an error message
                toast.update(toastId, {
                    render: "Data loadeding failed",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            });
    }

    useEffect(() => {
        getStudents(groupId);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-xl">Mark Attendance</h2>

                    <Link
                        className="btn"
                        href={route("view.group.info", { group_id: groupId })}
                    >
                        Back to Group
                    </Link>
                </div>
            }
        >
            <Head title="Students" />

            <div className="overflow-hidden bg-white dark:bg-slate-800 shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <Loading
                        isVisible={!isStudentDataLoaded}
                        message="Loading students to mark attendance"
                    ></Loading>

                    {isStudentDataLoaded && (
                        <MarkGroupedStudentsAttendanceForm
                            groupId={groupId}
                            students={students}
                            selectedDate={selectedDate}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
