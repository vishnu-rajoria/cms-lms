import { validateField, formErrors } from "@/Helpers/ValidationHelper";
import { groupRegistrationFormFields } from "@/Data/Group";
import { profilePicFormFields } from "@/Data/Comman";
import { getFormFieldsJSX } from "@/Helpers/FormHelper";
import IconGroup from "@/Components/IconGroup";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { getFormValidationStatus } from "@/Helpers/FormHelper";
import { toast, Zoom } from "react-toastify";
const baseURL = import.meta.env.VITE_APP_URL;

export default function GroupRegistrationForm({
    children,
    imagesURL,
    selectedId = null,
    responseHandler,
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

    const [groupList, setGroupList] = useState([]);
    function getGroupList() {
        axios
            .get(baseURL + "/api/get-group-list")
            .then(function (response) {
                // Log the response from the server
                console.log("Response from server");
                console.log(response);
                setGroupList(response.data.groups);
            })
            .catch(function (error) {
                // Log the error from the server
                console.log("Error from server");
                console.log(error.response.data);
            });
    }

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
                    console.log(response);
                    responseHandler(response);
                    toast.dismiss();
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
            <IconGroup className="p-5" max={15} imagesURL={imagesURL} />
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
                <div className="p-5 flex flex-wrap">
                    <div className="px-2 dark:text-gray-400 font-medium text-sm w-[100%] md:w-[50%]">
                        <div className="pb-1">Group Icon</div>
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
                    <div className="px-2 input-fields grid gap-5 w-[100%] md:w-[50%]">
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

                    <PrimaryButton className="col-span-2 mt-5 justify-center flex-grow">
                        Create Group
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
