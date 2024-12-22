import { useEffect } from "react";
import StudentAttendanceForm from "./StudentAttendanceForm";

import { getStudentImageURL } from "@/Helpers/ImageHelper";

export default function GroupStudentsAttendanceForm({
    students,
    groupId,
    getPrevioslyStoredStudentAttendance,
    selectedDate,
    ...props
}) {
    function getPrevioslyStoredStudentAttendance(userId, groupId, date) {
        return previoslyStoredGroupAttendance.filter((studentAttendance) => {
            if (
                studentAttendance.user_id == userId &&
                studentAttendance.group_id == groupId &&
                studentAttendance.date == date
            ) {
                console.log("method returning :");
                console.log(studentAttendance);
                return studentAttendance;
            }
        });
    }

    useEffect(() => {}, [selectedDate, getPrevioslyStoredStudentAttendance]);
    return (
        <>
            {students.map((student, index) => {
                return (
                    <div
                        key={student.id + "_" + index}
                        className="shadow-xl p-6 text-slate-400"
                    >
                        Date : {selectedDate}
                        <div className="flex items-center">
                            <img
                                className="w-[60px] h-[60px] rounded-full "
                                src={getStudentImageURL(
                                    student.id,
                                    student.profile_pic
                                )}
                                alt=""
                            />
                            <span className="ml-2">{student.name}</span>

                            <input
                                type="hidden"
                                name="student_id[]"
                                value={student.id}
                            />
                            <input
                                type="hidden"
                                name="group_id[]"
                                value={groupId}
                            />
                        </div>
                        <StudentAttendanceForm
                            previouslyStoredAttendance={getPrevioslyStoredStudentAttendance(
                                student.id,
                                groupId,
                                selectedDate
                            )}
                            key={student.id + "_" + index}
                        />
                    </div>
                );
            })}
        </>
    );
}
