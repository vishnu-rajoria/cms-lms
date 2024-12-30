/**
 * This component is used to register a student by the admin.
 * The form data is validated and handled here.
 * The component also displays the form errors.
 * The form data is sent to the server when the form is submitted.
 * The server response is handled here.
 */
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import StudentRegistrationForm from "@/Forms/StudentRegistrationForm";
import { useEffect, useState } from "react";
import { validateField, formErrors } from "@/Helpers/ValidationHelper";
import { studentRegistrationFormFields } from "@/Data/Student";
import {
    permanentAddressFormFields,
    currentAddressFormFields,
    profilePicFormFields,
    signaturePicFormFields,
} from "@/Data/Comman";
import axios from "axios";
import { toast, Zoom } from "react-toastify";
import {
    getFormDataWithFormId,
    getFormValidationStatus,
    clearFormHandler,
} from "@/Helpers/FormHelper";
import { getCourses } from "@/Helpers/CoursesRequestHelper";

const baseURL = import.meta.env.VITE_APP_URL;

export default function StudentRegistrationByAdmin() {
    // The state variable formData stores all the fields of the student registration form.
    const [courses, setCourses] = useState([]);

    const [
        studentRegistrationFormFieldsData,
        setStudentRegistrationFormFieldsData,
    ] = useState(JSON.parse(JSON.stringify(studentRegistrationFormFields)));
    studentRegistrationFormFieldsData["course_id"].options = courses;

    const [permanentAddressFormFieldsData, setPermanentAddressFormFieldsData] =
        useState(JSON.parse(JSON.stringify(permanentAddressFormFields)));

    const [currentAddressFormFieldsData, setCurrentAddressFormFieldsData] =
        useState(JSON.parse(JSON.stringify(currentAddressFormFields)));

    const [profilePicFormFieldsData, setProfilePicFormFieldsData] = useState(
        JSON.parse(JSON.stringify(profilePicFormFields))
    );

    const [signaturePicFormFieldsData, setSignaturePicFormFieldsData] =
        useState(JSON.parse(JSON.stringify(signaturePicFormFields)));

    // The allFormFieldsGroup is an object containing all the form fields data state variables, their setter methods adn orginialData that is being used to reset the fields to orignal state
    const allFormFieldsGroup = {
        studentRegistrationFormFieldsData: {
            data: studentRegistrationFormFieldsData,
            setterMethod: setStudentRegistrationFormFieldsData,
            originalData: JSON.parse(
                JSON.stringify(studentRegistrationFormFields)
            ),
        },
        permanentAddressFormFieldsData: {
            data: permanentAddressFormFieldsData,
            setterMethod: setPermanentAddressFormFieldsData,
            originalData: JSON.parse(
                JSON.stringify(permanentAddressFormFields)
            ),
        },
        currentAddressFormFieldsData: {
            data: currentAddressFormFieldsData,
            setterMethod: setCurrentAddressFormFieldsData,
            originalData: JSON.parse(JSON.stringify(currentAddressFormFields)),
        },
        profilePicFormFieldsData: {
            data: profilePicFormFieldsData,
            setterMethod: setProfilePicFormFieldsData,
            originalData: JSON.parse(JSON.stringify(profilePicFormFields)),
        },
        signaturePicFormFieldsData: {
            data: signaturePicFormFieldsData,
            setterMethod: setSignaturePicFormFieldsData,
            originalData: JSON.parse(JSON.stringify(signaturePicFormFields)),
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

    // The formId is the id of the form, which is used to identify the form and get the filled form data in the page.
    const formId = "student-registation-form";
    const formSubmitionUrl = baseURL + "/api/save-student";
    /**
     * This function is the submit handler for the student registration form.
     * It prevents the default form submission behavior.
     * It creates a FormData object from the form element.
     * It logs the FormData object to the console for debugging purposes.
     * @param {Event} e The event object.
     */
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
        let formValidationStatus = getFormValidationStatus(allFormFieldsGroup);

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
                    if (response.data.status == "success") {
                        toast.update(toastId, {
                            render: "User Registered Successfully",
                            type: "success",
                            isLoading: false,
                            autoClose: 5000,
                            transition: Zoom,
                            theme: "colored",
                        });
                    }
                })
                .catch(function (error) {
                    // Log the error from the server
                    console.log("Error from server");
                    console.log(error.response.data);

                    if (error.response.data.status == "error") {
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
                });
        }
    }

    // This function is used to update the formData state variable
    // with new values when the user enters a value in the form field.
    // It also validates the entered value using the validation rules
    // defined for the field in the studentRegistrationFormFields object.
    // The validation response is then used to update the fieldValidationStatus
    // property of the formData object with the result of the validation.
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

    useEffect(() => {
        let getCourseRequest = getCourses();
        getCourseRequest.then((response) => {
            console.log(response);

            console.log("the following data has been set to courses");
            console.log(response.data);

            let courseSelectorOptions = response.data.map((course) => {
                return {
                    value: course.id + "",
                    text: course.name,
                };
            });
            console.log(courseSelectorOptions);

            setCourses(courseSelectorOptions);
        });
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between ">
                    <h2>Register Student</h2>
                </div>
            }
        >
            <Head title="student-registration" />

            <div className="overflow-hidden shadow-sm sm:rounded-lg box-border bg-slate-800">
                <div className="p-6 text-gray-900 dark:text-gray-400">
                    <StudentRegistrationForm
                        formId={formId}
                        submitHandler={submitHandler}
                        clearFormHandler={(event) => {
                            clearFormHandler(event, allFormFieldsGroup);
                        }}
                        formData={{
                            studentRegistrationFormFieldsData,
                            permanentAddressFormFieldsData,
                            currentAddressFormFieldsData,
                            profilePicFormFieldsData,
                            signaturePicFormFieldsData,
                        }}
                        errors={formErrors}
                    ></StudentRegistrationForm>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
