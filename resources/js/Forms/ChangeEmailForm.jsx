import { validateField, formErrors } from "@/Helpers/ValidationHelper";
import { changeEmailFormFields } from "@/Data/Comman";
import { getFormFieldsJSX } from "@/Helpers/FormHelper";
import IconGroup from "@/Components/IconGroup";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { getFormValidationStatus } from "@/Helpers/FormHelper";
import { toast, Zoom } from "react-toastify";
import VerifyOtpForm from "./VerifyOtpForm";
import { randomDigitString } from "@/Helpers/StringHelper";
import axios from "axios";
const baseURL = import.meta.env.VITE_APP_URL;

export default function ChangeEmailForm({
    userRoleId,
    userId = null,
    emailChangeResponseHandler,
}) {
    const [changeEmailFormFieldsData, setChangeEmailFormFieldsData] = useState(
        JSON.parse(JSON.stringify(changeEmailFormFields))
    );
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailResetResponseReceived, setEmailResetResponseReceived] =
        useState(false);
    const [emailResetSuccessful, setEmailResetSuccessful] = useState(false);
    const [showOtpVerificationForm, setShowOtpVerificationForm] =
        useState(false);

    const allFormFieldsGroup = {
        changeEmailFormFieldsData: {
            data: changeEmailFormFieldsData,
            setterMethod: setChangeEmailFormFieldsData,
            originalData: JSON.parse(JSON.stringify(changeEmailFormFields)),
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
    const formId = "change-user-email-form";
    const formSubmitionUrl = route("send.mail.for.change.user.email");

    function submitHandler(e) {
        e.preventDefault();
        // Display a loading toast message at the bottom-right
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });

        console.log("Form submitted");

        const form = document.querySelector("#" + formId);
        const formFields = form.querySelectorAll("input");

        let email = formFields[1].value;
        setEmail(email);

        // Create a FormData object from the form element
        let formData = new FormData(form);

        let newOtp = randomDigitString(6);
        setOtp(newOtp);
        formData.append("otp", newOtp);
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
                    // responseHandler(response);

                    if (response.data.status == "success") {
                        setShowOtpVerificationForm(true);
                    }
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

    function verifyOtpResponseHandler(response) {
        console.log("OTP verification response : ");
        console.log(response);
        let formSubmitionUrl = route("change.user.email");

        // Display a loading toast message at the bottom-right

        let formData = new FormData();

        formData.append("user_id", userId);
        formData.append("new_email", email);
        if (response.status == "matched") {
            axios
                .post(formSubmitionUrl, formData)
                .then(function (response) {
                    // Log the response from the server
                    console.log("Response from server");
                    console.log(response);
                    // responseHandler(response);
                    const toastId = toast.loading("loading data...", {
                        position: "bottom-right",
                    });
                    if (response.data.status == "success") {
                        setEmailResetResponseReceived(true);
                        setEmailResetSuccessful(true);
                        console.log("success");
                        toast.update(toastId, {
                            render: response.data.message,
                            type: "success",
                            isLoading: false,
                            closeOnClick: true,
                            draggable: true,
                            transition: Zoom,
                            theme: "colored",
                            autoClose: 5000,
                        });
                    }
                })
                .catch(function (error) {
                    setEmailResetResponseReceived(true);
                    setEmailResetSuccessful(false);
                    // Log the error from the server
                    console.log("Error from server");
                    console.log(error);

                    if (error.response.data.message) {
                        const toastId = toast.loading("loading data...", {
                            position: "bottom-right",
                        });
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
        } else if (response.status == "not matched") {
            const toastId = toast.loading("loading data...", {
                position: "bottom-right",
            });
            toast.update(toastId, {
                render: "OTP did not matched",
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
    return (
        <div className="p-6">
            {emailResetResponseReceived && emailResetSuccessful && (
                <div className="flex gap-2 items-center justify-center">
                    <img
                        className="w-[40px] h-[40px]"
                        src={
                            baseURL +
                            "/storage/app_media/white-heavy-check-mark.svg"
                        }
                        alt=""
                    />
                    <div className="text-white">
                        new email {email} has been set successfully.
                    </div>
                </div>
            )}

            {emailResetResponseReceived && !emailResetSuccessful && (
                <div className="flex gap-2 items-center justify-center">
                    <img
                        className="w-[40px] h-[40px]"
                        src={baseURL + "/storage/app_media/multiply-cross.svg"}
                        alt=""
                    />
                    <div className="text-white">can not update email.</div>
                </div>
            )}

            {showOtpVerificationForm && !emailResetResponseReceived && (
                <>
                    <div className="flex gap-2 items-center justify-center">
                        <img
                            className="w-[40px] h-[40px]"
                            src={
                                baseURL +
                                "/storage/app_media/white-heavy-check-mark.svg"
                            }
                            alt=""
                        />
                        <div className="text-white">
                            An email has been sent to ( {email} ) please enter
                            the received code below. do not refresh/close
                            browser.
                        </div>
                    </div>
                    <VerifyOtpForm
                        otp={otp}
                        verifyOtpResponseHandler={verifyOtpResponseHandler}
                    />
                </>
            )}
            {!showOtpVerificationForm && (
                <form
                    id={formId}
                    onSubmit={submitHandler}
                    method="POST"
                    className="grid gap-4"
                    encType="multipart/form-data"
                >
                    <input
                        name="selected_user_id"
                        type="hidden"
                        value={userId}
                    />
                    <div className="flex flex-col items-center">
                        <div className="px-2 dark:text-gray-400 font-medium text-sm w-[100%] md:w-[50%]">
                            {getFormFieldsJSX(
                                changeEmailFormFieldsData,
                                {
                                    selectedFieldsKey: Object.keys(
                                        changeEmailFormFieldsData
                                    ),
                                },
                                "changeEmailFormFieldsData"
                            )}
                        </div>

                        <button className="col-span-2 mt-5 justify-center flex-grow btn btn-primary">
                            verify email
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
