import AuthenticatedLayout from "@/Layouts/Student/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useState } from "react";
DataTable.use(DT);
export default function StudentDashboard({ students }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Student Dashboard
                </h2>
            }
        >
            <Head title="Students" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 class="text-lg font-bold mb-5">
                                Student's personalised Dashboard
                            </h1>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. In fugit sapiente alias, amet
                                veniam magnam ratione doloremque architecto
                                libero nemo dolorum necessitatibus. Esse odio,
                                facere nobis necessitatibus quibusdam beatae
                                obcaecati.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
