import AdminAuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import TeacherAuthenticatedLayout from "@/Layouts/Teacher/AuthenticatedLayout";
import StudentAuthenticatedLayout from "@/Layouts/Student/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ role, mustVerifyEmail, status }) {
    const header = (
        <>
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Profile
            </h2>
        </>
    );
    const editProfileForm = (
        <>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-transparent p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white  dark:bg-transparent p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white  dark:bg-transparent p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );

    let editFormScreen = (
        <>
            <StudentAuthenticatedLayout header={header}>
                {editProfileForm}
            </StudentAuthenticatedLayout>
        </>
    );

    if (role == "admin") {
        editFormScreen = (
            <>
                <AdminAuthenticatedLayout header={header}>
                    {editProfileForm}
                </AdminAuthenticatedLayout>
            </>
        );
    } else if (role == "teacher") {
        editFormScreen = (
            <>
                <TeacherAuthenticatedLayout header={header}>
                    {editProfileForm}
                </TeacherAuthenticatedLayout>
            </>
        );
    }
    return editFormScreen;
}
