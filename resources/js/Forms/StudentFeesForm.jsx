import { baseURL } from "@/Env";
import { useState } from "react";
import { studentFeeFormFields } from "@/Data/Student";
import { validateField, formErrors } from "@/Helpers/ValidationHelper";
import { toast, Zoom } from "react-toastify";
import axios from "axios";
import { getFormFieldsJSX } from "@/Helpers/FormHelper";
import {
    getFormDataWithFormId,
    getFormValidationStatus,
    clearFormHandler,
} from "@/Helpers/FormHelper";
export default function StudentFeesForm({
    studentId,
    studentFeeSaveSuccessHandler,
    showFeesHistory,
    ...props
}) {
    // for student fee form
    const [studentFeeFormFieldsData, setStudentFeeFormFieldsData] = useState(
        JSON.parse(JSON.stringify(studentFeeFormFields))
    );
    const formId = "student-fee-payment-form";
    const formSubmitionUrl = baseURL + "/api/save-student-fees-record";

    const allFormFieldsGroup = {
        studentFeeFormFieldsData: {
            data: studentFeeFormFieldsData,
            setterMethod: setStudentFeeFormFieldsData,
            originalData: JSON.parse(JSON.stringify(studentFeeFormFields)),
        },
    };

    attachEventListenersToAllFormFieldsGroup();
    function attachEventListenersToAllFormFieldsGroup() {
        Object.keys(allFormFieldsGroup).forEach((key) => {
            let formFieldsGroup = allFormFieldsGroup[key];
            Object.keys(formFieldsGroup.data).map(
                (field) =>
                    (formFieldsGroup.data[field].fieldEvents = {
                        onChange: [setData],
                        onClick: [() => console.log("clicked")],
                    })
            );
        });
    }

    function setData(key, value, dataFieldsGroupVariable) {
        // console.log(
        //     "key : " +
        //         key +
        //         " value : " +
        //         value +
        //         "  dataFieldsGroupVariable :  " +
        //         dataFieldsGroupVariable
        // );
        //// Update the value of the field in the formData object
        let newDataFieldsGroup = { ...eval(dataFieldsGroupVariable) };

        // console.log("newDataFieldsGroup is : ");
        // console.log(newDataFieldsGroup);

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

    function submitHandler(e) {
        e.preventDefault();

        const toastId = toast.loading("Saving student...", {
            position: "bottom-right",
            theme: "colored",
        });

        // Create a FormData object from the form element
        let formData = getFormDataWithFormId(formId);
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
            // axios post method is used to send the FormData object to the server
            // The server will receive the FormData object and process it
            axios
                .post(formSubmitionUrl, formData)
                .then(function (response) {
                    console.log(response);
                    if (response.data.status == "success") {
                        toast.update(toastId, {
                            render: "Student fee saved successfully",
                            type: "success",
                            isLoading: false,
                            autoClose: 5000,
                            transition: Zoom,
                            theme: "colored",
                        });

                        studentFeeSaveSuccessHandler();

                        showFeesHistory();
                    }
                })
                .catch(function (error) {
                    // Log the error from the server
                    console.log("Error from server");
                    console.log(error);
                    console.log(error.response);
                    if (error.response != undefined) {
                        if (error.response.status == "error") {
                            toast.update(toastId, {
                                render: error.response.data.errors[0],
                                type: "error",
                                isLoading: false,
                                closeOnClick: true,
                                draggable: true,
                                transition: Zoom,
                                theme: "colored",
                                autoClose: 5000,
                            });
                        }
                    }
                });
        }
    }

    return (
        <form
            id={formId}
            onSubmit={submitHandler}
            method="POST"
            className="grid gap-4 text-gray-200"
            encType="multipart/form-data"
        >
            <input type="text" name="student_id" value={studentId} hidden />
            <input type="text" name="module_name" value="student_fee" hidden />
            {getFormFieldsJSX(
                allFormFieldsGroup.studentFeeFormFieldsData.data,
                {
                    selectedFieldsKey: Object.keys(
                        allFormFieldsGroup.studentFeeFormFieldsData.data
                    ),
                },
                "studentFeeFormFieldsData"
            )}
            <div className="flex justify-end">
                <button className="btn" onClick={clearFormHandler}>
                    Clear
                </button>
                <button className="btn">Save</button>
            </div>
        </form>
    );
}
