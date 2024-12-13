const baseURL = import.meta.env.VITE_APP_URL;

export const studentsTableColumnsMini = [
    {
        name: "",
        selector: (row, index) => {
            if (row.profile_pic) {
                return (
                    <a href="#">
                        <img
                            className="w-[50px] rounded-full p-2"
                            src={`${baseURL}/storage/students/${row.id}/profile_pictures/${row.profile_pic}`}
                        />
                    </a>
                );
            } else {
                return (
                    <img
                        className="w-[50px] rounded-full p-2"
                        src={`${baseURL}/storage/dummy/profile_pic.jpg`}
                    />
                );
            }
        },
        sortable: true,
        width: "100px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        // width: "150px",
    },
    {
        name: "Father's name",
        selector: (row, index) => row.fname,
        sortable: true,
        // width: "150px",
    },
    {
        name: "Course",
        selector: (row, index) => {
            switch (row.course) {
                case 1:
                    return "FSWD";
                    break;
                case 2:
                    return "Web Design";
                    break;
                case 3:
                    return "Python";
                    break;
            }
        },
        sortable: true,
        // width: "150px",
    },
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
    },
];

// Configuration for student registration form fields
export const studentRegistrationFormFields = {
    sname: {
        label: "Student's Name",
        value: "",
        type: "text",
        validatorRules: ["notEmpty", "minLength|2"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    doj: {
        label: "Date of Joining",
        type: "date",
        value: new Date().toISOString().slice(0, 10),
        validatorRules: ["notEmpty", "validDate"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    email: {
        label: "Email",
        value: "",
        type: "email",
        validatorRules: ["notEmpty", "validEmail"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    password: {
        label: "Password",
        value: "",
        type: "password",
        validatorRules: ["notEmpty", "validPassword"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    fname: {
        label: "Father's Name",
        value: "",
        type: "text",
        validatorRules: ["notEmpty", "minLength|2"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    mname: {
        label: "Mother's Name",
        type: "text",
        value: "",
        validatorRules: ["notRequired", "minLength|2"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    dob: {
        label: "Date of birth",
        type: "date",
        value: "",
        validatorRules: ["notEmpty", "validDate"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    gender: {
        label: "Gender",
        value: "",
        type: "select",
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    course: {
        label: "Course",
        value: "",
        type: "select",
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    school_college: {
        label: "School/College",
        type: "text",
        value: "",
        validatorRules: ["notEmpty", "minLength|10"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    subject_branch: {
        label: "Subject/Branch",
        type: "text",
        value: "",
        validatorRules: ["notEmpty", "minLength|2"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};
