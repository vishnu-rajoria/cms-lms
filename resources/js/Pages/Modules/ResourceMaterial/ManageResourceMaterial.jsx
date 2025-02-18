import { baseURL } from "@/Env";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import StudentAuthenticatedLayout from "@/Layouts/Student/AuthenticatedLayout";
import AdminAuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import TeacherAuthenticatedLayout from "@/Layouts/Teacher/AuthenticatedLayout";
import { usePage, Link } from "@inertiajs/react";
import ResourceMaterialTable from "./ResourceMaterialTable";
import ResourceMaterialForm from "@/Forms/ResourceMaterialForm";
import Modal from "@/Components/Modal";
export default function DisplayResourceMaterial({ test }) {
    const user = usePage().props.auth.user;
    const [showModal, setShowModal] = useState(false);

    function createNewResource() {
        setShowModal(true);
    }

    return (
        <>
            {/* {JSON.stringify(user)} */}
            {user.role_id == 1 && (
                <AdminAuthenticatedLayout
                    header={
                        <div className="flex items-center gap-4 flex-wrap justify-between">
                            <h2>Resources Material </h2>

                            <div className="btn" onClick={createNewResource}>
                                Add new
                            </div>
                        </div>
                    }
                >
                    <Head title="Resource Material" />

                    <Modal show={showModal} onClose={() => setShowModal(false)}>
                        <ResourceMaterialForm />
                    </Modal>

                    <ResourceMaterialTable userId={user.id} userType="admin" />
                </AdminAuthenticatedLayout>
            )}
            {user.role_id == 2 && (
                <TeacherAuthenticatedLayout>
                    <ResourceMaterialTable
                        userId={user.id}
                        userType="teacher"
                    />
                </TeacherAuthenticatedLayout>
            )}
            {user.role_id == 3 && (
                <StudentAuthenticatedLayout>
                    <ResourceMaterialTable
                        userId={user.id}
                        userType="student"
                    />
                </StudentAuthenticatedLayout>
            )}
        </>
    );
}
