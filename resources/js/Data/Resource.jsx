export const resourceMaterialRegistrationFormFields = {
    name: {
        label: "File Name",
        value: "",
        type: "text",
        validatorRules: ["notEmpty", "minLength|6"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    date: {
        label: "Creation Date",
        type: "date",
        value: new Date().toISOString().slice(0, 10),
        validatorRules: ["notEmpty", "validDate"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    description: {
        label: "Description",
        type: "textarea",
        value: "",
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};
