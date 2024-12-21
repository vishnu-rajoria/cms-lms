import { baseURL } from "@/Env";

import { getFormValidationStatus } from "@/Helpers/FormHelper";
import { useState, useEffect } from "react";
import StudentAttendanceForm from "./StudentAttendanceForm";
import { getStudentImageURL } from "@/Helpers/ImageHelper";
import { toast, Zoom } from "react-toastify";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
export default function MarkGroupedStudentsAttendanceForm({
    groupId,
    students,
    responseHandler,
    ...props
}) {
    const formId = "group-students-attendance-form";
    const formSubmitionUrl = baseURL + "/api/save-students-attendance";
    const getPrevioslyStoredGroupAttendanceUrl =
        baseURL + "/api/get-group-students-attendance";

    let [previoslyStoredGroupAttendance, setPrevioslyStoredGroupAttendance] =
        useState([]);
    let [
        isPrevioslyStoredGroupAttendanceLoaded,
        setIsPrevioslyStoredGroupAttendanceLoaded,
    ] = useState(false);

    let [
        isPrevioslyStoredGroupAttendanceinDB,
        setIsPrevioslyStoredGroupAttendanceinDB,
    ] = useState(false);

    // let [selectedDate, setSelectedDate] = useState(
    //     (function (d) {
    //         d.setDate(d.getDate() - 1);
    //         return d;
    //     })(new Date())
    //         .toISOString()
    //         .slice(0, 10)
    // );

    let [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().slice(0, 10)
    );

    function submitHandler(e) {
        e.preventDefault();
        // Display a loading toast message at the bottom-right
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });

        console.log("Form submitted");

        const form = document.querySelector("#" + formId);

        // Create a FormData object from the form element
        let formData = new FormData(form);

        console.log(formData);
        // Validate the form overall with validating all the form fields grouped together
        // let formValidationStatus = getFormValidationStatus(allFormFieldsGroup);
        let formValidationStatus = { isInvalid: false };
        console.log("Form validation status inside submitHandler: ");
        console.log(formValidationStatus);

        if (formValidationStatus.isInvalid) {
            toast.update(toastId, {
                render: formValidationStatus.errorMessage,
                type: "error",
                isLoading: false,
                closeOnClick: true,
                draggable: true,
                transition: Zoom,
                theme: "colored",
                autoClose: 5000,
            });
        } else {
            axios
                .post(formSubmitionUrl, formData)
                .then(function (response) {
                    // Log the response from the server
                    console.log("Response from server");
                    console.log(response);
                    responseHandler(response);
                    toast.update(toastId, {
                        render: "Attendace Saved Successfully",
                        type: "success",
                        isLoading: false,
                        closeOnClick: true,
                        draggable: true,
                        transition: Zoom,
                        autoClose: 5000,
                    });
                })
                .catch(function (error) {
                    // Log the error from the server
                    console.log("Error from server");
                    console.log(error.response.data);

                    if (error.response.data.message) {
                        toast.update(toastId, {
                            render: error.response.data.message,
                            type: "error",
                            isLoading: false,
                            closeOnClick: true,
                            draggable: true,
                            transition: Zoom,
                            theme: "colored",
                            autoClose: 5000,
                        });
                    }
                });
        }
    }

    function getPrevioslyStoredGroupAttendance(groupId, date) {
        let formData = { groupId, date };
        axios
            .post(getPrevioslyStoredGroupAttendanceUrl, formData)
            .then(function (response) {
                // Log the response from the server
                console.log(
                    "Response from server : Previosuly Stored Group Attenadance"
                );
                console.log(response.data.studentsAttendance);
                setPrevioslyStoredGroupAttendance(
                    response.data.studentsAttendance
                );
                setIsPrevioslyStoredGroupAttendanceLoaded(false);
                setIsPrevioslyStoredGroupAttendanceLoaded(true);
                if (response.data.studentsAttendance.length > 0) {
                    setIsPrevioslyStoredGroupAttendanceinDB(true);
                } else {
                    setIsPrevioslyStoredGroupAttendanceinDB(false);
                }
            })
            .catch(function (error) {
                // Log the error from the server
                console.log("Error from server");
                console.log(error.response.data);
            });
    }

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

    useEffect(() => {
        console.log(
            "Inside useeffect getting previosult stored group attendance"
        );
        getPrevioslyStoredGroupAttendance(groupId, selectedDate);
    }, [selectedDate]);

    return (
        <div className="">
            <h1 className="px-6 py-6 text-2xl text-green-300">
                Marks Student Attendance
            </h1>
            <form
                onSubmit={submitHandler}
                className="grid gap-2"
                id={formId}
                action={formSubmitionUrl}
            >
                <div className="shadow-xl p-6">
                    <InputLabel>Date of attendance</InputLabel>
                    <TextInput
                        name="date"
                        type="date"
                        value={selectedDate}
                        onChange={(event) =>
                            setSelectedDate(event.target.value)
                        }
                    />
                    <input
                        type="text"
                        name=""
                        id=""
                        defaultValue={
                            setIsPrevioslyStoredGroupAttendanceinDB ? 1 : 0
                        }
                    />
                </div>
                {/* {JSON.stringify(previoslyStoredGroupAttendance)} */}
                {students.map((student, index) => {
                    return (
                        <div
                            key={student.id + "_" + index}
                            className="shadow-xl p-6 text-slate-400"
                        >
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
                            {isPrevioslyStoredGroupAttendanceLoaded && (
                                <StudentAttendanceForm
                                    previouslyStoredAttendance={getPrevioslyStoredStudentAttendance(
                                        student.id,
                                        groupId,
                                        selectedDate
                                    )}
                                    key={student.id + "_" + index}
                                />
                            )}
                        </div>
                    );
                })}
                <button className="btn primary-btn">Save</button>
            </form>
        </div>
    );
}
