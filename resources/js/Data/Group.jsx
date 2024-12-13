const baseURL = import.meta.env.VITE_APP_URL;

// Configuration for student registration form fields
export const groupRegistrationFormFields = {
    name: {
        label: "Group Name",
        value: "Eagle Batch 2024",
        type: "text",
        validatorRules: ["notEmpty", "minLength|6"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    date: {
        label: "Group Creation Date",
        type: "date",
        value: new Date().toISOString().slice(0, 10),
        validatorRules: ["notEmpty", "validDate"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    description: {
        label: "Group Description",
        type: "textarea",
        value: "",
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};
