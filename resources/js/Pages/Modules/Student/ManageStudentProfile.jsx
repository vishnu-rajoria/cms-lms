import { baseURL } from "@/Env";
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StudentProfile from "./StudentProfile";
/**
 * The admin dashboard
 *
 * @param {object} props
 * @param {object} props.series - The data for the chart
 * @property {string} props.series.name - The name of the series
 * @property {Array} props.series.data - The data for the series
 * @returns {React.ReactElement} The admin dashboard component
 */
export default function ManageStudentProfile({ studentId }) {
    return (
        <AuthenticatedLayout header={""}>
            <Head title="Dashboard" />
            <div class="p-2"></div>
            <StudentProfile studentId={studentId} canModify={true} />
        </AuthenticatedLayout>
    );
}
