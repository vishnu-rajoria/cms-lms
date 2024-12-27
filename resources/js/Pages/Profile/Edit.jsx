import AdminAuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import TeacherAuthenticatedLayout from "@/Layouts/Teacher/AuthenticatedLayout";
import StudentAuthenticatedLayout from "@/Layouts/Student/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { useState } from "react";

export default function Edit({ role, mustVerifyEmail, status }) {
    const [
        isChangeProfileDetailsFormVisible,
        setIsChangeProfileDetailsFormVisible,
    ] = useState(true);

    const [isChangePasswordFormVisible, setIsChangePasswordFormVisible] =
        useState(false);

    const [isDeleteAccountFormVisible, setIsDeleteAccountFormVisible] =
        useState(false);

    const header = (
        <>
            <h2 className="text-xl font-semibold leading-tight dark:text-green-300">
                Profile
            </h2>
        </>
    );
    const editProfileForm = (
        <>
            <Head title="Profile" />

            <div className="py-12 bg-slate-800 rounded-lg">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <ul className="tab-btn flex gap-0">
                        <li
                            onClick={() => {
                                setIsChangeProfileDetailsFormVisible(true);
                                setIsChangePasswordFormVisible(false);
                                setIsDeleteAccountFormVisible(false);
                            }}
                        >
                            <button
                                className={
                                    "btn  btn-link " +
                                    (isChangeProfileDetailsFormVisible
                                        ? " bg-green-700 text-white border-gray-100"
                                        : " ")
                                }
                            >
                                Change Profile Details
                            </button>
                        </li>
                        <li
                            onClick={() => {
                                setIsChangeProfileDetailsFormVisible(false);
                                setIsChangePasswordFormVisible(true);
                                setIsDeleteAccountFormVisible(false);
                            }}
                        >
                            <button
                                className={
                                    "btn  btn-link " +
                                    (isChangePasswordFormVisible
                                        ? " bg-green-700 text-white border-gray-100"
                                        : " ")
                                }
                            >
                                Change Password
                            </button>
                        </li>
                        <li
                            onClick={() => {
                                setIsChangeProfileDetailsFormVisible(false);
                                setIsChangePasswordFormVisible(false);
                                setIsDeleteAccountFormVisible(true);
                            }}
                        >
                            <button
                                className={
                                    "btn  btn-link " +
                                    (isDeleteAccountFormVisible
                                        ? " bg-green-700 text-white border-gray-100"
                                        : " ")
                                }
                            >
                                Delete Account
                            </button>
                        </li>
                    </ul>

                    <div className="bg-white dark:bg-transparent p-4 shadow sm:rounded-lg ">
                        {isChangeProfileDetailsFormVisible && (
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        )}

                        {isChangePasswordFormVisible && (
                            <UpdatePasswordForm className="max-w-xl" />
                        )}

                        {isDeleteAccountFormVisible && (
                            <DeleteUserForm className="max-w-xl" />
                        )}
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
