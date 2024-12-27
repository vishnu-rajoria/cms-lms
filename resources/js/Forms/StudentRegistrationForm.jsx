import React, { useEffect } from "react";
import { getFormFieldsJSX } from "@/Helpers/FormHelper";

export default function StudentRegistrationForm({
    formId,
    submitHandler,
    clearFormHandler,
    formData,
}) {
    // console.log("inside student registration form form data is :");
    // console.log(formData);
    return (
        <>
            <form
                id={formId}
                onSubmit={submitHandler}
                method="POST"
                className="grid gap-4"
                encType="multipart/form-data"
            >
                <div className="grid gap-5 lg:grid-cols-[7fr,3fr] sm:grid-cols-[6fr,4fr] xsm:grid-cols-[1fr,1fr]">
                    <div className="input-fields grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                        {getFormFieldsJSX(
                            formData.studentRegistrationFormFieldsData,
                            {
                                selectedFieldsKey: Object.keys(
                                    formData.studentRegistrationFormFieldsData
                                ),
                            },
                            "studentRegistrationFormFieldsData"
                        )}
                    </div>
                    <div className="grid gap-4">
                        <div>
                            {getFormFieldsJSX(
                                formData.profilePicFormFieldsData,
                                {
                                    // selectedFieldsKey: ["sname"],
                                    selectedFieldsKey: ["profile_pic[]"],
                                },
                                "profilePicFormFieldsData"
                            )}
                        </div>
                        <div>
                            {getFormFieldsJSX(
                                formData.signaturePicFormFieldsData,
                                {
                                    // selectedFieldsKey: ["sname"],
                                    selectedFieldsKey: ["signature_pic[]"],
                                },
                                "signaturePicFormFieldsData"
                            )}
                        </div>
                    </div>
                </div>

                <div className="address-inputs grid md:grid-cols-[1fr,1fr] gap-5">
                    <div className="address-fields-container p-2 py-8 grid gap-4 bg-gray-100 dark:bg-slate-700 rounded-md">
                        <h3 className="text-lg text-bold">Permanent Address</h3>
                        <div className="grid gap-2">
                            {getFormFieldsJSX(
                                formData.permanentAddressFormFieldsData,
                                {
                                    selectedFieldsKey: [
                                        "permanent_address_line1",
                                        "permanent_address_line2",
                                        "permanent_address_landmark",
                                    ],
                                },
                                "permanentAddressFormFieldsData"
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {getFormFieldsJSX(
                                formData.permanentAddressFormFieldsData,
                                {
                                    selectedFieldsKey: [
                                        "permanent_address_city",
                                        "permanent_address_state",
                                        "permanent_address_pincode",
                                    ],
                                },
                                "permanentAddressFormFieldsData"
                            )}
                        </div>
                    </div>
                    <div className="address-fields-container p-2 py-8 grid gap-4 bg-gray-100 dark:bg-slate-700 rounded-md">
                        <h3 className="text-lg text-bold">Current Address</h3>
                        <div>
                            {getFormFieldsJSX(
                                formData.currentAddressFormFieldsData,
                                {
                                    selectedFieldsKey: [
                                        "current_address_line1",
                                        "current_address_line2",
                                        "current_address_landmark",
                                    ],
                                },
                                "currentAddressFormFieldsData"
                            )}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {getFormFieldsJSX(
                                formData.currentAddressFormFieldsData,
                                {
                                    selectedFieldsKey: [
                                        "current_address_city",
                                        "current_address_state",
                                        "current_address_pincode",
                                    ],
                                },
                                "currentAddressFormFieldsData"
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="btn" onClick={clearFormHandler}>
                        Clear
                    </button>
                    <button className="btn">Save</button>
                </div>
            </form>
        </>
    );
}
