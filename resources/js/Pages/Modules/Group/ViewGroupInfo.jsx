import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";

import { formatISO } from "date-fns";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Loading from "@/Components/Loading";
import NavLink from "@/Components/NavLink";
import StudentsTable from "../Student/StudentsTable";

export default function ViewGroupInfo({ groupId, ...props }) {
    const baseURL = import.meta.env.VITE_APP_URL;

    const [pending, setPending] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showAttendaceForm, setShowAttendaceForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDateMarked, setIsDateMarked] = useState(false);

    useEffect(() => {
        setPending(false);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-xl">Students </h2>

                    {!pending && (
                        <>
                            <PrimaryButton
                                onClick={() => {
                                    setShowModal(true);
                                    setShowAttendaceForm(true);
                                }}
                                className="shrink-0"
                            >
                                Mark Attendance
                            </PrimaryButton>
                        </>
                    )}
                </div>
            }
        >
            <Head title="Students" />

            <Modal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setShowAttendaceForm(false);
                    setGroupRegistrationForm(false);
                }}
            >
                {showAttendaceForm && (
                    // <MarkStudentAttendanceForm
                    //     groupId={groupId}
                    //     students={students}
                    //     responseHandler={studentAttendanceResponseHandler}
                    // />
                    <div className="flex flex-col justify-center items-center p-6 gap-6 h-full">
                        {!isDateMarked && (
                            <>
                                <h3 className="text-white py-3">
                                    Select Date to mark attendance
                                </h3>
                                <Calendar
                                    format="dd-MM-y"
                                    isOpen={true}
                                    onChange={(value) => {
                                        console.log("date changed");
                                        console.log(value);
                                        setSelectedDate(value);
                                    }}
                                    value={selectedDate}
                                />

                                <NavLink
                                    className="text-green-100 bg-green-700 border-green-300 rounded-md p-2 px-6 hover:bg-green-600  hover:text-white"
                                    href={route(
                                        "mark.student.attendance.form",
                                        {
                                            group_id: groupId,
                                            date: formatISO(selectedDate).slice(
                                                0,
                                                10
                                            ),
                                        }
                                    )}
                                    onClick={() => setIsDateMarked(true)}
                                >
                                    Click to Mark Attendance
                                </NavLink>
                            </>
                        )}
                        {isDateMarked && <Loading isVisible={true} />}
                    </div>
                )}
            </Modal>

            <StudentsTable groupId={groupId}></StudentsTable>
        </AuthenticatedLayout>
    );
}
