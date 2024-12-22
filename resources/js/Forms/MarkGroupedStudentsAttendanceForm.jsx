import { baseURL } from "@/Env";
import { router } from "@inertiajs/react";
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
    selectedDate,

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

    function submitHandler(e) {
        e.preventDefault();
        // Display a loading toast message at the bottom-right
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });

        // console.log("Form submitted");

        const form = document.querySelector("#" + formId);

        // Create a FormData object from the form element
        let formData = new FormData(form);

        // console.log(formData);
        // Validate the form overall with validating all the form fields grouped together
        // let formValidationStatus = getFormValidationStatus(allFormFieldsGroup);
        let formValidationStatus = { isInvalid: false };
        // console.log("Form validation status inside submitHandler: ");
        // console.log(formValidationStatus);

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

                    toast.update(toastId, {
                        render: "Attendace Saved Successfully",
                        type: "success",
                        isLoading: false,
                        closeOnClick: true,
                        draggable: true,
                        transition: Zoom,
                        autoClose: 5000,
                    });
                    router.visit(
                        route(
                            "view.group.info",
                            { group_id: groupId },
                            { method: "get" }
                        )
                    );
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
                // console.log(
                //     "Response from server : Previosuly Stored Group Attenadance"
                // );
                // console.log(response.data.studentsAttendance);
                setPrevioslyStoredGroupAttendance(
                    response.data.studentsAttendance
                );
                setIsPrevioslyStoredGroupAttendanceLoaded(true);
            })
            .catch(function (error) {
                // Log the error from the server
                // console.log("Error from server");
                // console.log(error.response.data);
            });
    }

    function getPrevioslyStoredStudentAttendance(userId, groupId, date) {
        return previoslyStoredGroupAttendance.filter((studentAttendance) => {
            if (
                studentAttendance.user_id == userId &&
                studentAttendance.group_id == groupId &&
                studentAttendance.date == date
            ) {
                return studentAttendance;
            }
        });
    }

    useEffect(() => {
        // console.log(
        //     "Inside useeffect getting previosult stored group attendance"
        // );
        getPrevioslyStoredGroupAttendance(groupId, selectedDate);
    }, [selectedDate]);

    return (
        <div>
            <h1 className="py-6 text-2xl text-green-300">
                Marks Student Attendance
            </h1>
            <InputLabel>Date of attendance</InputLabel>
            <div className="text-white text-xl">{selectedDate}</div>
            {/* {JSON.stringify(previoslyStoredGroupAttendance)} */}
            <form
                onSubmit={submitHandler}
                className="grid"
                id={formId}
                action={formSubmitionUrl}
            >
                <div className="shadow-xl pb-2">
                    <input
                        type="date"
                        value={selectedDate}
                        hidden
                        name="date"
                        readOnly
                    />

                    <input
                        type="text"
                        name="saved_previously"
                        id=""
                        value={
                            previoslyStoredGroupAttendance.length > 0
                                ? "1"
                                : "0"
                        }
                        readOnly
                        hidden
                    />
                </div>
                <div className="grid grid-cols-2 ">
                    {/* {JSON.stringify(previoslyStoredGroupAttendance)} */}
                    {students.map((student, index) => {
                        return (
                            <div
                                key={student.id + "_" + index}
                                className="shadow-xl p-6 text-slate-400 border-[1px] border-slate-700"
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
                                        readOnly
                                    />
                                    <input
                                        type="hidden"
                                        name="group_id[]"
                                        value={groupId}
                                        readOnly
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
                </div>
                <div className="flex justify-end py-4">
                    <button className="btn btn-lg btn-success">Save</button>
                </div>
            </form>
        </div>
    );
}
