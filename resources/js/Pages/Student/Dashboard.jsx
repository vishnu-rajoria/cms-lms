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
import StudentProfile from "../Modules/Student/StudentProfile";
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
        <AuthenticatedLayout header={""}>
            <Head title="Dashboard" />
            <div class="p-2"></div>
            <StudentProfile studentId={user.id} canModify={false} />
        </AuthenticatedLayout>
    );
}
