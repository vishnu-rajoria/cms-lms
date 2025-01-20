import { validateField, formErrors } from "@/Helpers/ValidationHelper";
import { verifyOtpFormFields } from "@/Data/Comman";
import { getFormFieldsJSX } from "@/Helpers/FormHelper";
import IconGroup from "@/Components/IconGroup";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { getFormValidationStatus } from "@/Helpers/FormHelper";
import { toast, Zoom } from "react-toastify";

import axios from "axios";
const baseURL = import.meta.env.VITE_APP_URL;

export default function VerifyOtpForm({ otp, verifyOtpResponseHandler }) {
    const [verifyOtpFormFieldsData, setVerifyOtpFormFieldsData] = useState(
        JSON.parse(JSON.stringify(verifyOtpFormFields))
    );

    const allFormFieldsGroup = {
        verifyOtpFormFieldsData: {
            data: verifyOtpFormFieldsData,
            setterMethod: setVerifyOtpFormFieldsData,
            originalData: JSON.parse(JSON.stringify(verifyOtpFormFields)),
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
    const formId = "verify-otp-form";
    // const formSubmitionUrl = route("change.user.email");

    function submitHandler(e) {
        e.preventDefault();
        let inputOtp = "";
        // Display a loading toast message at the bottom-right
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });

        // console.log("Form submitted");

        const form = document.querySelector("#" + formId);
        const inputs = form.querySelectorAll("input");

        // console.log(inputs);

        for (let i = 0; i < inputs.length; i++) {
            inputOtp += inputs[i].value;
        }

        console.log(inputOtp);
        // Validate the form overall with validating all the form fields grouped together
        let formValidationStatus = getFormValidationStatus(allFormFieldsGroup);

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
            console.log(`comparing ${inputOtp} == ${otp}`);
            if (inputOtp == otp) {
                // console.log("Matched");
                verifyOtpResponseHandler({ status: "matched" });
            } else {
                // console.log("Matched");
                verifyOtpResponseHandler({ status: "not matched" });
            }
            toast.dismiss();
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

    return (
        <div>
            {/* {otp} */}
            <form
                id={formId}
                onSubmit={submitHandler}
                method="POST"
                className="grid gap-4 flex "
                encType="multipart/form-data"
            >
                <div className="flex flex-col  flex-wrap items-center">
                    <div className="px-2 dark:text-gray-400 font-medium text-sm w-[100%] md:w-[50%] flex gap-2">
                        {getFormFieldsJSX(
                            verifyOtpFormFieldsData,
                            {
                                selectedFieldsKey: Object.keys(
                                    verifyOtpFormFieldsData
                                ),
                            },
                            "verifyOtpFormFieldsData"
                        )}
                    </div>

                    <button className="col-span-2 mt-5 justify-center flex-grow btn btn-primary">
                        Verify OTP
                    </button>
                </div>
            </form>
        </div>
    );
}
