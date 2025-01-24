import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";
import { getFormFieldsJSX } from "@/Helpers/FormHelper";
import { validateField } from "@/Helpers/ValidationHelper";
import { getFormValidationStatus } from "@/Helpers/FormHelper";
import { baseURL } from "@/Env";
import { changePasswordFormFields } from "@/Data/Comman";
import { toast, Zoom } from "react-toastify";
import axios from "axios";
export default function UpdatePasswordForm({ className = "" }) {
    const loggedInUser = usePage().props.auth.user;
    const formId = "update-user-password-form";
    const [changePasswordFormFieldsData, setChangePasswordFormFieldsData] =
        useState(JSON.parse(JSON.stringify(changePasswordFormFields)));
    const allFormFieldsGroup = {
        changePasswordFormFieldsData: {
            data: changePasswordFormFieldsData,
            setterMethod: setChangePasswordFormFieldsData,
            originalData: JSON.parse(JSON.stringify(changePasswordFormFields)),
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
    const [passwordUpdateResponseReceived, setPasswordUpdateResponseReceived] =
        useState(false);
    const [passwordUpdatedSuccessfully, setPasswordUpdatedSuccessfully] =
        useState(false);
    // const passwordInput = useRef();
    // const currentPasswordInput = useRef();

    // const {
    //     data,
    //     setData,
    //     errors,
    //     put,
    //     reset,
    //     processing,
    //     recentlySuccessful,
    // } = useForm({
    //     current_password: "",
    //     password: "",
    //     password_confirmation: "",
    // });

    const updatePasswordHandler = (e) => {
        e.preventDefault();
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });

        console.log("updatedPasswordHandler running");
        let formValidationStatus = getFormValidationStatus(allFormFieldsGroup);
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
            let formSubmitionUrl = route("password.update");
            let formElement = document.querySelector("#" + formId);
            let formData = new FormData(formElement);
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
                        setPasswordUpdateResponseReceived(true);
                        setPasswordUpdatedSuccessfully(true);

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
                    setPasswordUpdateResponseReceived(true);
                    setPasswordUpdatedSuccessfully(false);
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
        }
    };

    return (
        <section className={className}>
            {passwordUpdateResponseReceived && passwordUpdatedSuccessfully && (
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
                        new password has been set successfully.
                    </div>
                </div>
            )}

            {passwordUpdateResponseReceived && !passwordUpdatedSuccessfully && (
                <div className="flex gap-2 items-center justify-center">
                    <img
                        className="w-[40px] h-[40px]"
                        src={baseURL + "/storage/app_media/multiply-cross.svg"}
                        alt=""
                    />
                    <div className="text-white">can not update password.</div>
                </div>
            )}

            {!passwordUpdateResponseReceived && (
                <div>
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                            Update Password
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Ensure your account is using a long, random password
                            to stay secure.
                        </p>
                    </header>

                    <form
                        onSubmit={updatePasswordHandler}
                        id={formId}
                        className="mt-6 space-y-6"
                    >
                        <input
                            type="text"
                            name="user_id"
                            value={loggedInUser.id}
                            hidden
                        />
                        <div className="flex flex-col items-center">
                            <div className="px-2 dark:text-gray-400 font-medium text-sm w-[100%]">
                                {getFormFieldsJSX(
                                    changePasswordFormFieldsData,
                                    {
                                        selectedFieldsKey: Object.keys(
                                            changePasswordFormFieldsData
                                        ),
                                    },
                                    "changePasswordFormFieldsData"
                                )}
                            </div>

                            <button className="col-span-2 mt-5 justify-center flex-grow btn btn-primary">
                                set new password
                            </button>
                        </div>

                        {/* <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full text-white"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div className="text-white">
                    <InputLabel htmlFor="password" value="New Password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="mt-1 block w-full dark:text-white"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full dark:text-white"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button className="btn btn-primary" disabled={processing}>
                        Save
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div> */}
                    </form>
                </div>
            )}
        </section>
    );
}
