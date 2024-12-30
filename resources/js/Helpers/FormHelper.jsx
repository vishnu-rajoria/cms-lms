import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import DropdownInput from "@/Components/DropdownInput";
import FileUploadInput from "@/Components/FileUploadInput";
import { validateFormFields } from "@/Helpers/ValidationHelper";
import TextareaInput from "@/Components/TextareaInput";
import ToggleBtn from "@/Components/ToggleBtn";
export function getFormFieldsJSX(
    formFields,
    settings = {},
    dataFieldsGroupVariable = ""
) {
    // console.log("Form fields inside getFormFieldsJSX");
    // console.log(formFields);
    let selectedFieldsKey = [];
    let fieldEvents = {};
    if (settings.selectedFieldsKey) {
        selectedFieldsKey = settings.selectedFieldsKey;
    }
    if (settings.fieldEvents) {
        fieldEvents = settings.fieldEvents;
    }
    // console.log("Selected field keys are inside getFormFieldsJSX");
    // console.log(selectedFieldsKey);
    return Object.keys(formFields).map((key) => {
        let formField = formFields[key];

        if (selectedFieldsKey.indexOf(key) > -1) {
            // console.log(`Current field case is : ${formField.type}`);
            switch (formField.type) {
                case "toggle":
                    return (
                        <div key={"input-field-container-" + key}>
                            <ToggleBtn
                                options={formField.options}
                                name={key}
                                value={formField.value}
                                id={key}
                                key={key}
                                className="mt-1 block w-full"
                                onChange={(event) => {
                                    formField.fieldEvents.onChange.map(
                                        (functionToFire) => {
                                            functionToFire(
                                                key,
                                                event.target.value,
                                                dataFieldsGroupVariable
                                            );
                                        }
                                    );
                                }}
                                onClick={(event, value) => {
                                    formField.fieldEvents.onClick.map(
                                        (functionToFire) => {
                                            functionToFire(
                                                key,
                                                event,
                                                dataFieldsGroupVariable
                                            );
                                        }
                                    );
                                }}
                            />
                            <InputLabel
                                htmlFor={key}
                                defaultValue={formField.label}
                            />
                            <InputError
                                isInvalid={
                                    formField.fieldValidationStatus.isInvalid
                                }
                                message={
                                    formField.fieldValidationStatus.message
                                }
                            />
                        </div>
                    );
                    break;
                case "text":
                case "password":
                case "date":
                case "email":
                case "number":
                    return (
                        <div key={"input-field-container-" + key}>
                            <InputLabel htmlFor={key} value={formField.label} />
                            <TextInput
                                id={key}
                                type={formField.type}
                                name={key}
                                key={key}
                                value={formField.value}
                                className="mt-1 block w-full"
                                // autoComplete="username"
                                onChange={(e) => {
                                    formField.fieldEvents.onChange.map(
                                        (functionToFire) => {
                                            functionToFire(
                                                key,
                                                e.target.value,
                                                dataFieldsGroupVariable
                                            );
                                        }
                                    );
                                }}
                                onClick={(e) => {
                                    formField.fieldEvents.onClick.map(
                                        (functionToFire) => {
                                            functionToFire(key, e.target.value);
                                        }
                                    );
                                }}
                            />

                            <InputError
                                isInvalid={
                                    formField.fieldValidationStatus.isInvalid
                                }
                                message={
                                    formField.fieldValidationStatus.message
                                }
                            />
                        </div>
                    );
                    break;
                case "textarea":
                    return (
                        <div key={"input-field-container-" + key}>
                            <InputLabel htmlFor={key} value={formField.label} />
                            <TextareaInput
                                id={key}
                                type={formField.type}
                                name={key}
                                key={key}
                                value={formField.value}
                                className="mt-1 block w-full"
                                // autoComplete="username"
                                onChange={(e) => {
                                    formField.fieldEvents.onChange.map(
                                        (functionToFire) => {
                                            functionToFire(
                                                key,
                                                e.target.value,
                                                dataFieldsGroupVariable
                                            );
                                        }
                                    );
                                }}
                                onClick={(e) => {
                                    formField.fieldEvents.onClick.map(
                                        (functionToFire) => {
                                            functionToFire(key, e.target.value);
                                        }
                                    );
                                }}
                            />

                            <InputError
                                isInvalid={
                                    formField.fieldValidationStatus.isInvalid
                                }
                                message={
                                    formField.fieldValidationStatus.message
                                }
                            />
                        </div>
                    );
                    break;

                case "file":
                    return (
                        <div
                            className="relative"
                            key={"input-field-container-" + key}
                        >
                            <InputLabel
                                htmlFor={key}
                                value={formField.label}
                            ></InputLabel>
                            <FileUploadInput
                                type={formField.type}
                                text={formField.label}
                                id={key}
                                key={key}
                                name={key}
                                value={formField.value}
                                uploadURI={formField.uploadURI}
                                maxNumberOfFiles={formField.maxNumberOfFiles}
                                previewElementStyle={
                                    formField.previewElementStyle
                                }
                            ></FileUploadInput>
                        </div>
                    );
                    break;
                case "select":
                    return (
                        <div key={"input-field-container-" + key}>
                            <InputLabel htmlFor={key} value={formField.label} />
                            <DropdownInput
                                name={key}
                                type={formField.type}
                                id={key}
                                key={key}
                                options={formField.options}
                                value={formField.value}
                                onChange={(e) => {
                                    formField.fieldEvents.onChange.map(
                                        (functionToFire) => {
                                            functionToFire(
                                                key,
                                                e.target.value,
                                                dataFieldsGroupVariable
                                            );
                                        }
                                    );
                                }}
                            />
                            <InputError
                                isInvalid={
                                    formField.fieldValidationStatus.isInvalid
                                }
                                message={
                                    formField.fieldValidationStatus.message
                                }
                            />
                        </div>
                    );
                    break;
            }
        } else {
            return <></>;
        }
    });
}

export function getFormDataWithFormId(formId) {
    // Select the form element using its ID
    const form = document.querySelector("#" + formId);

    // Create a FormData object from the form element
    return new FormData(form);
}

export function getFormValidationStatus(allFormFieldsGroup) {
    let formValidationStatus = {
        isInvalid: false,
        errorMessage:
            "Some of the enteries in the form is invalid please fill these out before proceeding",
    };

    Object.keys(allFormFieldsGroup).forEach((key) => {
        let formFieldsGroup = allFormFieldsGroup[key].data;
        let groupValidationOutput = validateFormFields(formFieldsGroup);
        // console.log(key + " : form fields validation status is ");
        // console.log(groupValidationOutput);

        updatedValidationStatus(
            allFormFieldsGroup[key].setterMethod,
            formFieldsGroup,
            groupValidationOutput.formFieldsValidationStatus
        );

        // console.log(
        //     `For form ${key} isFormValid is ${groupValidationOutput.isFormValid}`
        // );
        if (!groupValidationOutput.isFormValid) {
            // console.log("form is invalid");
            formValidationStatus.isInvalid = true;
        }
    });

    return formValidationStatus;
}

export function updatedValidationStatus(
    methodToSetState,
    formFieldsGroup,
    formFieldsValidationStatus
) {
    // initialize the newFormFieldsGroup
    let newFormFieldsGroup = { ...formFieldsGroup };
    Object.keys(newFormFieldsGroup).forEach((key) => {
        if (formFieldsValidationStatus[key]) {
            newFormFieldsGroup[key].fieldValidationStatus = {
                isInvalid: formFieldsValidationStatus[key].isInvalid,
                message: formFieldsValidationStatus[key].errors[0],
            };
        } else {
            newFormFieldsGroup[key].fieldValidationStatus = {
                isInvalid:
                    newFormFieldsGroup[key].fieldValidationStatus.isInvalid,
                message: newFormFieldsGroup[key].fieldValidationStatus.message,
            };
        }
    });

    // console.log("newFormFieldsGroup is ");
    // console.log(newFormFieldsGroup);
    methodToSetState(newFormFieldsGroup);
}

export function clearFormHandler(e = null, allFormFieldsGroup) {
    if (e !== null) {
        e.preventDefault();
    }

    // console.log("Clearing the form now");
    // console.log(allFormFieldsGroup);

    Object.keys(allFormFieldsGroup).forEach((key) => {
        let originalData = allFormFieldsGroup[key].originalData;
        let setterMethod = allFormFieldsGroup[key].setterMethod;
        setterMethod(originalData);
    });
    return;
}

export function getBlankInputFields(formFieldData) {
    return Object.keys(formFieldData).map((key, index) => {
        let field = formFieldData[key];
        // console.log("field is : ");
        // console.log(field);
        return (
            <input
                key={key + "_" + index}
                hidden
                name={key}
                type="text"
                defaultValue="0"
            />
        );
    });
}
