import { validateField, formErrors } from "@/Helpers/ValidationHelper";
import { groupRegistrationFormFields } from "@/Data/Group";
import { profilePicFormFields } from "@/Data/Comman";
import { getFormFieldsJSX } from "@/Helpers/FormHelper";
import IconGroup from "@/Components/IconGroup";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { getFormValidationStatus } from "@/Helpers/FormHelper";
const baseURL = import.meta.env.VITE_APP_URL;

export default function GroupRegistrationForm({
    children,
    imagesURL,
    selectedId = null,
}) {
    const [
        groupRegistrationFormFieldsData,
        setGroupRegistrationFormFieldsData,
    ] = useState(JSON.parse(JSON.stringify(groupRegistrationFormFields)));

    const [profilePicFormFieldsData, setProfilePicFormFieldsData] = useState(
        JSON.parse(JSON.stringify(profilePicFormFields))
    );

    const allFormFieldsGroup = {
        groupRegistrationFormFieldsData: {
            data: groupRegistrationFormFieldsData,
            setterMethod: setGroupRegistrationFormFieldsData,
            originalData: JSON.parse(
                JSON.stringify(groupRegistrationFormFields)
            ),
        },

        profilePicFormFieldsData: {
            data: profilePicFormFieldsData,
            setterMethod: setProfilePicFormFieldsData,
            originalData: JSON.parse(JSON.stringify(profilePicFormFields)),
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
    const formId = "student-group-registation-form";
    const formSubmitionUrl = baseURL + "/api/save-group";

    function submitHandler(e) {
        e.preventDefault();

        console.log("Form submitted");

        const form = document.querySelector("#" + formId);

        // Create a FormData object from the form element
        let formData = new FormData(form);

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
            axios
                .post(formSubmitionUrl, formData)
                .then(function (response) {
                    // Log the response from the server
                    console.log("Response from server");
                    console.log(response.data);
                    // Optionally, you can display a success message to the user
                    if (responce.data.status == "success") {
                        toast.update(toastId, {
                            render: "User Registered Successfully",
                            type: "success",
                            isLoading: false,
                            autoClose: 5000,
                            transition: Zoom,
                            theme: "colored",
                        });
                        clearFormHandler();
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
        <>
            <IconGroup className="p-5" max={2} imagesURL={imagesURL} />
            <form
                id={formId}
                onSubmit={submitHandler}
                method="POST"
                className="grid gap-4"
                encType="multipart/form-data"
            >
                <input
                    name="selected-students-id"
                    type="hidden"
                    value={JSON.stringify(selectedId)}
                />
                <div className="p-5 grid gap-5 sm:grid-cols-[1fr,1fr] grid-cols-[1fr] xsm:grid-cols-[1fr,1fr]">
                    <div className="input-fields grid gap-5">
                        {getFormFieldsJSX(
                            groupRegistrationFormFieldsData,
                            {
                                selectedFieldsKey: Object.keys(
                                    groupRegistrationFormFieldsData
                                ),
                            },
                            "groupRegistrationFormFieldsData"
                        )}
                    </div>
                    <div className="input-fields ">
                        {getFormFieldsJSX(
                            profilePicFormFieldsData,
                            {
                                selectedFieldsKey: Object.keys(
                                    profilePicFormFieldsData
                                ),
                            },
                            "profilePicFormFieldsData"
                        )}
                    </div>
                    <PrimaryButton className="col-span-2 justify-center">
                        Create Group
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
