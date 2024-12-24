import { baseURL } from "@/Env";
import IconGroup from "@/Components/IconGroup";
import axios from "axios";
import DropdownInput from "@/Components/DropdownInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
export default function AssignStudentToGroupForm({
    groupList,
    imagesURL,
    selectedId = null,
    responseHandler,
}) {
    const formId = "student-group-registation-form";
    const formSubmitionUrl = baseURL + "/api/assign-students-to-group";
    let groupSelectorOptions = groupList.map((group) => {
        return { value: group.id, text: group.name };
    });

    /**
     * This function is the submit handler for the student registration form.
     * It prevents the default form submission behavior.
     * It creates a FormData object from the form element.
     * It logs the FormData object to the console for debugging purposes.
     * It validates the form overall with validating all the form fields grouped together.
     * If the form is invalid, it displays the error message and prevents the form submission.
     * If the form is valid, it sends the form data to the server using axios post method.
     * The server will receive the FormData object and process it.
     * It logs the response from the server to the console for debugging purposes.
     * @param {Event} e The event object.
     */
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
        selectedId.map((id) => formData.append("selected_students_id[]", id));
        // console.log(formData);
        // // Validate the form overall with validating all the form fields grouped together
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

    return (
        <div>
            {/* {JSON.stringify(groupList)} */}
            <IconGroup className="p-5" max={15} imagesURL={imagesURL} />
            <form
                id={formId}
                onSubmit={submitHandler}
                method="POST"
                className="grid gap-4 p-6 text-white"
                encType="multipart/form-data"
            >
                <DropdownInput name="group_id" options={groupSelectorOptions} />

                <div className="flex justify-end">
                    <PrimaryButton>Submit</PrimaryButton>
                </div>
            </form>
        </div>
    );
}
