export const profilePicFormFields = {
    "profile_pic[]": {
        value: [
            // {
            //     preview:
            //         "http://localhost/cslab-app/cms/public/storage/students/27/profile_pictures/uFCUflqD9YzpBiSO4WSyDzr8JxWkRFFlT0gssf92.jpg",
            // },
        ],
        type: "file",
        maxNumberOfFiles: 1,
        previewElementStyle:
            "flex flex-wrap border border-dashed gap-2 p-2 w-full top-0 left-0 min-h-[100px]",
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
        label: `Select Profile Picture to upload`,
    },
};

export const signaturePicFormFields = {
    "signature_pic[]": {
        value: [
            // {
            //     preview:
            //         "http://localhost/cslab-app/cms/public/storage/students/22/profile_pictures/kma2JMUvkzF4ujbO9QrKuEwIYYMKyi72y0vUwpIV.jpg",
            // },
            // {
            //     preview:
            //         "http://localhost/cslab-app/cms/public/storage/students/27/profile_pictures/uFCUflqD9YzpBiSO4WSyDzr8JxWkRFFlT0gssf92.jpg",
            // },
        ],
        type: "file",
        maxNumberOfFiles: 1,
        previewElementStyle:
            "flex flex-wrap border border-dashed gap-2 p-2 w-full top-0 left-0 min-h-[100px]",
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
        label: `Select Profile Picture to upload`,
    },
};
export const permanentAddressFormFields = {
    permanent_address_line1: {
        label: "Address Line 1",
        type: "text",
        value: "",
        validatorRules: ["notEmpty", "minLength|10"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    permanent_address_line2: {
        label: "Address Line 2",
        type: "text",
        value: "",
        validatorRules: ["notRequired", "minLength|3"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    permanent_address_landmark: {
        label: "Landmark",
        type: "text",
        value: "",
        validatorRules: ["notRequired", "minLength|3"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    permanent_address_city: {
        label: "City",
        type: "select",
        options: [
            {
                text: "Sikar",
                value: "4",
            },
            {
                text: "Churu",
                value: "1",
            },
            {
                text: "Jhunjhunu",
                value: "2",
            },
            {
                text: "Deedwana",
                value: "3",
            },
        ],
        value: "4",
        // validatorRules: ["notEmpty", "minLength|2"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    permanent_address_state: {
        label: "State",
        type: "select",
        options: [
            {
                text: "Rajasthan",
                value: "1",
            },
            {
                text: "Haryana",
                value: "2",
            },
        ],
        value: "1",
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    permanent_address_pincode: {
        label: "Pincode",
        type: "text",
        value: "",
        validatorRules: ["notEmpty", "minLength|2"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};

export const currentAddressFormFields = {
    current_address_line1: {
        label: "Address Line 1",
        type: "text",
        value: "",
        validatorRules: ["notEmpty", "minLength|2"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    current_address_line2: {
        label: "Address Line 2",
        type: "text",
        value: "",
        validatorRules: ["notRequired", "minLength|2"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    current_address_landmark: {
        label: "Landmark",
        type: "text",
        value: "",
        validatorRules: ["notRequired", "minLength|3"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    current_address_city: {
        label: "City",
        type: "select",
        options: [
            {
                text: "Sikar",
                value: "4",
            },
            {
                text: "Churu",
                value: "1",
            },
            {
                text: "Jhunjhunu",
                value: "2",
            },
            {
                text: "Deedwana",
                value: "3",
            },
        ],
        value: "4",
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    current_address_state: {
        label: "State",
        type: "select",
        options: [
            {
                text: "Rajasthan",
                value: "1",
            },
            {
                text: "Haryana",
                value: "2",
            },
        ],
        value: "1",
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    current_address_pincode: {
        label: "Pincode",
        type: "text",
        value: "",
        validatorRules: ["notEmpty", "minLength|3"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};
