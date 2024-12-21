import { getBlankInputFields, getFormFieldsJSX } from "@/Helpers/FormHelper";
import { validateField } from "@/Helpers/ValidationHelper";

import { useState } from "react";
import {
    studentAttendanceStatusFormField,
    studentAttendanceRemarkFormField,
    studentAttendanceEarlyLeaveFormField,
    studentAttendanceOnLeaveFormField,
} from "@/Data/Student";
export default function StudentAttendanceForm({
    previouslyStoredAttendance,
    ...props
}) {
    const [previouslyAttendance, setPrevioslyAttendance] = useState(
        previouslyStoredAttendance[0]
    );

    // {"id":33,"user_id":70,"group_id":4,"date":"2024-12-21","is_present":1,"is_leave_uninformed":1,"late_entry_by_minutes":10,"early_leave_by_minutes":0,"remark":"10 minutes late","created_by_id":1}
    console.log("value of studentAttendanceStatusFormField : ");
    console.log(studentAttendanceStatusFormField);
    console.log("and previouslyAttendance is ");
    console.log(previouslyAttendance);

    if (previouslyAttendance != undefined) {
        studentAttendanceStatusFormField["is_present[]"].value =
            previouslyAttendance.is_present ? "checked" : "unchecked";

        studentAttendanceRemarkFormField["remark[]"].value =
            previouslyAttendance.remark;

        studentAttendanceEarlyLeaveFormField["late_entry_by_minutes[]"].value =
            previouslyAttendance.late_entry_by_minutes;

        studentAttendanceEarlyLeaveFormField["early_leave_by_minutes[]"].value =
            previouslyAttendance.early_leave_by_minutes;

        studentAttendanceOnLeaveFormField["is_leave_uninformed[]"].value =
            !previouslyAttendance.is_leave_uninformed ? "checked" : "unchecked";
        // console.log("before creting state variable is_present is ");
        // console.log(studentAttendanceStatusFormField["is_present[]"].value);
    }
    const [isOnLeave, setIsOnLeave] = useState(
        previouslyAttendance && !previouslyAttendance.is_present ? true : false
    );

    const [
        studentAttendanceStatusFormFieldData,
        setStudentAttendanceStatusFormFieldData,
    ] = useState(JSON.parse(JSON.stringify(studentAttendanceStatusFormField)));

    const [
        studentAttendanceOnLeaveFormFieldData,
        setStudentAttendanceOnLeaveFormFieldData,
    ] = useState(JSON.parse(JSON.stringify(studentAttendanceOnLeaveFormField)));

    const [
        studentAttendanceEarlyLeaveFormFieldData,
        setStudentAttendanceEarlyLeaveFormFieldData,
    ] = useState(
        JSON.parse(JSON.stringify(studentAttendanceEarlyLeaveFormField))
    );

    const [
        studentAttendanceRemarkFormFieldData,
        setStudentAttendanceRemarkFormFieldData,
    ] = useState(JSON.parse(JSON.stringify(studentAttendanceRemarkFormField)));

    const allFormFieldsGroup = {
        studentAttendanceStatusFormFieldData: {
            data: studentAttendanceStatusFormFieldData,
            setterMethod: setStudentAttendanceStatusFormFieldData,
            originalData: JSON.parse(
                JSON.stringify(studentAttendanceStatusFormField)
            ),
        },
        studentAttendanceOnLeaveFormFieldData: {
            data: studentAttendanceOnLeaveFormFieldData,
            setterMethod: setStudentAttendanceOnLeaveFormFieldData,
            originalData: JSON.parse(
                JSON.stringify(studentAttendanceOnLeaveFormField)
            ),
        },
        studentAttendanceEarlyLeaveFormFieldData: {
            data: studentAttendanceEarlyLeaveFormFieldData,
            setterMethod: setStudentAttendanceEarlyLeaveFormFieldData,
            originalData: JSON.parse(
                JSON.stringify(studentAttendanceEarlyLeaveFormField)
            ),
        },
        studentAttendanceRemarkFormFieldData: {
            data: studentAttendanceRemarkFormFieldData,
            setterMethod: setStudentAttendanceRemarkFormFieldData,
            originalData: JSON.parse(
                JSON.stringify(studentAttendanceRemarkFormField)
            ),
        },
    };

    attachEventListenersToAllFormFieldsGroup();
    function attachEventListenersToAllFormFieldsGroup() {
        Object.keys(allFormFieldsGroup).forEach((key) => {
            let formFieldsGroup = allFormFieldsGroup[key];
            Object.keys(formFieldsGroup.data).map((field) => {
                if (field == "is_present[]") {
                    return (formFieldsGroup.data[field].fieldEvents = {
                        onChange: [setData],
                        onClick: [
                            (key, event, dataFieldsGroupVariable) => {
                                console.log(key);
                                console.log("Status received is ");

                                event.target.getAttribute("data-status") ===
                                "true"
                                    ? setIsOnLeave(true)
                                    : setIsOnLeave(false);

                                console.log(event.target);

                                console.log(dataFieldsGroupVariable);
                            },
                            // console.log(
                            //     `status changed ${event.target.getAttribute(
                            //         "data-status"
                            //     )}`
                            // ),
                        ],
                    });
                } else {
                    return (formFieldsGroup.data[field].fieldEvents = {
                        onChange: [setData],
                        onClick: [() => console.log("clicked")],
                    });
                }
            });
        });
    }

    function setData(key, value, dataFieldsGroupVariable) {
        console.log(
            "key : " +
                key +
                " value : " +
                value +
                "  dataFieldsGroupVariable :  " +
                dataFieldsGroupVariable
        );
        //// Update the value of the field in the formData object
        let newDataFieldsGroup = { ...eval(dataFieldsGroupVariable) };

        console.log("newDataFieldsGroup is : ");
        console.log(newDataFieldsGroup);

        newDataFieldsGroup[key].value = value;
        // Get the validation rules for the field
        let validatorRules = newDataFieldsGroup[key].validatorRules;
        // Validate the entered value using the validation rules
        let validatorResponse = validateField(validatorRules, value);
        // Update the fieldValidationStatus property of the formData object
        // with the result of the validation
        newDataFieldsGroup[key].fieldValidationStatus = {
            isInvalid: validatorResponse.isInvalid,
            message: validatorResponse.errors[0],
        };
        // Update the formData state variable with the new data
        let dataSetterMethodName = `set${
            dataFieldsGroupVariable[0].toUpperCase() +
            dataFieldsGroupVariable.slice(1)
        }`;
        let dataSetterMethod = eval(dataSetterMethodName);
        dataSetterMethod(newDataFieldsGroup);
    }

    return (
        <div className="text-gray-200">
            {/* {JSON.stringify(previouslyStoredAttendance)} */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {getFormFieldsJSX(
                    studentAttendanceStatusFormFieldData,
                    {
                        selectedFieldsKey: Object.keys(
                            studentAttendanceStatusFormFieldData
                        ),
                    },
                    "studentAttendanceStatusFormFieldData"
                )}
                {!isOnLeave ? (
                    getFormFieldsJSX(
                        studentAttendanceEarlyLeaveFormFieldData,
                        {
                            selectedFieldsKey: Object.keys(
                                studentAttendanceEarlyLeaveFormFieldData
                            ),
                        },
                        "studentAttendanceEarlyLeaveFormFieldData"
                    )
                ) : (
                    <>
                        {getBlankInputFields(
                            studentAttendanceEarlyLeaveFormFieldData
                        )}
                    </>
                )}
                {isOnLeave ? (
                    getFormFieldsJSX(
                        studentAttendanceOnLeaveFormFieldData,
                        {
                            selectedFieldsKey: Object.keys(
                                studentAttendanceOnLeaveFormFieldData
                            ),
                        },
                        "studentAttendanceOnLeaveFormFieldData"
                    )
                ) : (
                    <>
                        {getBlankInputFields(
                            studentAttendanceOnLeaveFormFieldData
                        )}
                    </>
                )}
            </div>
            {getFormFieldsJSX(
                studentAttendanceRemarkFormFieldData,
                {
                    selectedFieldsKey: Object.keys(
                        studentAttendanceRemarkFormFieldData
                    ),
                },
                "studentAttendanceRemarkFormFieldData"
            )}
        </div>
    );
}
