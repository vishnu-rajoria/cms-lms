import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

import StudentsTable from "./StudentsTable";

export default function ManageStudents() {
    const baseURL = import.meta.env.VITE_APP_URL;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-xl">Students </h2>

                    <Link
                        className="btn"
                        href={baseURL + "/admin/register-student"}
                    >
                        Register student
                    </Link>
                </div>
            }
        >
            <Head title="Students" />

            <StudentsTable groupId={"all"}></StudentsTable>
        </AuthenticatedLayout>
    );
}
