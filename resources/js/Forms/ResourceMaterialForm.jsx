import { validateField, formErrors } from "@/Helpers/ValidationHelper";
import { resourceMaterialRegistrationFormFields } from "@/Data/Resource";
import { fileUploadFormFields } from "@/Data/Comman";
import { getFormFieldsJSX } from "@/Helpers/FormHelper";
import IconGroup from "@/Components/IconGroup";
import { useState, useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { getFormValidationStatus } from "@/Helpers/FormHelper";
import { toast, Zoom } from "react-toastify";
import { getGroupIconURL } from "@/Helpers/ImageHelper";
import axios from "axios";
const baseURL = import.meta.env.VITE_APP_URL;

export default function ResourceMaterialForm({
    selectedId = null,
    responseHandler,
}) {
    const [groupList, setGroupList] = useState([]);
    const [fileUploadFormFieldsData, setFileUploadFormFieldsData] = useState(
        JSON.parse(JSON.stringify(fileUploadFormFields))
    );

    const [
        resourceMaterialRegistrationFormFieldsData,
        setResourceMaterialRegistrationFormFieldsData,
    ] = useState(
        JSON.parse(JSON.stringify(resourceMaterialRegistrationFormFields))
    );

    const allFormFieldsGroup = {
        resourceMaterialRegistrationFormFieldsData: {
            data: resourceMaterialRegistrationFormFieldsData,
            setterMethod: setResourceMaterialRegistrationFormFieldsData,
            originalData: JSON.parse(
                JSON.stringify(resourceMaterialRegistrationFormFields)
            ),
        },

        fileUploadFormFieldsData: {
            data: fileUploadFormFieldsData,
            setterMethod: setFileUploadFormFieldsData,
            originalData: JSON.parse(JSON.stringify(fileUploadFormFields)),
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
    const formSubmitionUrl = route("save.resource.material");

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
    /**
     * getGroupList() function
     * Fetches the list of groups from the server and updates the groupList state.
     * If the groupList is already populated, the function returns early to avoid
     * redundant network requests. Logs the server response or error for debugging.
     */

    function getGroupList() {
        if (groupList.length > 0) return;
        axios
            .get(baseURL + "/api/get-groups")
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

    useEffect(() => {
        getGroupList();
    }, []);

    return (
        <div className="dark dark:bg-slate-800 h-auto p-6">
            <h1 className="text-2xl font-bold p-6 text-white">
                Add New Resource Material
            </h1>
            <form
                id={formId}
                onSubmit={submitHandler}
                method="POST"
                className="grid gap-4"
                encType="multipart/form-data"
            >
                <div className="p-5 flex flex-wrap">
                    <div className="px-2 dark:text-gray-400 font-medium text-sm w-[100%] md:w-[50%]">
                        {getFormFieldsJSX(
                            fileUploadFormFieldsData,
                            {
                                selectedFieldsKey: Object.keys(
                                    fileUploadFormFieldsData
                                ),
                            },
                            "fileUploadFormFieldsData"
                        )}
                    </div>
                    <div className="px-2 input-fields grid gap-5 w-[100%] md:w-[50%]">
                        {getFormFieldsJSX(
                            resourceMaterialRegistrationFormFieldsData,
                            {
                                selectedFieldsKey: Object.keys(
                                    resourceMaterialRegistrationFormFieldsData
                                ),
                            },
                            "resourceMaterialRegistrationFormFieldsData"
                        )}
                    </div>
                    <div>
                        <h1 className="text-lg py-6 dark:text-white ">
                            Select to make it available for the following groups
                        </h1>
                        {groupList.map((group) => {
                            return (
                                <label>
                                    <div className="flex items-center gap-2 py-2 dark:text-white">
                                        <img
                                            className="rounded-full w-[40px] h-[40px]"
                                            src={getGroupIconURL(
                                                group.id,
                                                group.group_icon
                                            )}
                                            alt=""
                                        />
                                        <input
                                            name="selected_groups[]"
                                            type="checkbox"
                                            value={group.id}
                                        />
                                        <span className="select-none">
                                            {group.name} ( {group.members_count}{" "}
                                            students )
                                        </span>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <button className="btn btn-primary col-span-2 mt-5 justify-center flex-grow">
                    upload resource
                </button>
            </form>
        </div>
    );
}
