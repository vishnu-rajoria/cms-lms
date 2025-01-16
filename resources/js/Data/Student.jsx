import Badge from "@/Components/Badge";

import { Link, router } from "@inertiajs/react";
import { formattedMysqlDateAndTime } from "@/Helpers/TimeHelper";
const baseURL = import.meta.env.VITE_APP_URL;

export const studentsTableColumnsMini = [
    {
        name: "",
        selector: (row, index) => {
            if (row.profile_pic) {
                return (
                    <Link href={route("student.profile", row.id)}>
                        <img
                            className="w-[50px] rounded-full p-2"
                            src={`${baseURL}/storage/students/profile_pics/${row.id}/sm/sm-${row.profile_pic}`}
                        />
                    </Link>
                );
            } else {
                return (
                    <Link href={route("student.profile", row.id)}>
                        <img
                            className="w-[50px] rounded-full p-2"
                            src={`${baseURL}/storage/dummy/profile_pic.jpg`}
                        />
                    </Link>
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
            switch (row.course_id) {
                case 2:
                    return (
                        <Badge
                            title="Full Stack Web Development"
                            className="border border-green-500 dark:text-green-300 dark:bg-emerald-800 "
                        >
                            FSWD
                        </Badge>
                    );
                    break;
                case 1:
                    return (
                        <Badge
                            className="border border-orange-500 dark:text-yellow-400 dark:bg-orange-800
                        "
                        >
                            Web Design
                        </Badge>
                    );
                    break;
                case 3:
                    return (
                        <Badge className="border border-indigo-500 dark:text-indigo-300 dark:bg-indigo-800 ">
                            Python
                        </Badge>
                    );
                    break;
            }
        },
        sortable: true,
        width: "130px",
    },
    // {
    //     name: "Email",
    //     selector: (row) => row.email,
    //     sortable: true,
    // },
    {
        name: "Joining date",
        selector: (row, index) => {
            return formattedMysqlDateAndTime(row.doj);
        },
        sortable: true,
        // width: "150px",
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
        options: [
            {
                value: "1",
                text: "Male",
            },
            {
                value: "2",
                text: "Female",
            },
            {
                value: "3",
                text: "Do not disclose",
            },
        ],
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    course_id: {
        label: "Course",
        value: "2",
        type: "select",
        options: [],
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
    mobile_number_1: {
        label: "Mobile Number 1st",
        type: "text",
        value: "",
        validatorRules: ["notEmpty", "minLength|10"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    mobile_number_2: {
        label: "Mobile Number 2nd",
        type: "text",
        value: "",
        validatorRules: ["notRequired", "minLength|10"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    portfolio_link: {
        label: "Portfolio Link",
        type: "text",
        value: "",
        validatorRules: ["notRequired", "minLength|5"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    course_fee_concession: {
        label: "Concession",
        type: "number",
        value: "0",
        validatorRules: ["notRequired", "min|0", "max|100000"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    amount_paid: {
        label: "Amount paid",
        type: "number",
        value: "0",
        validatorRules: ["notRequired", "min|1000", "max|100000"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    transaction_serial_number: {
        label: "Transaction Serial Number",
        type: "text",
        value: "",
        validatorRules: ["notRequired"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    module_name: {
        label: "",
        type: "hidden",
        value: "student-fee",
        validatorRules: ["notRequired"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    transaction_mode: {
        label: "Transaction mode",
        type: "select",
        value: "cash",
        options: [
            { text: "Card", value: "card" },
            { text: "Internet banking", value: "intb" },
            { text: "Neft", value: "neft" },
            { text: "RTGS", value: "rtgs" },
            { text: "UPI", value: "upi" },
            { text: "Cash", value: "cash" },
            { text: "Cheque", value: "chq" },
            { text: "Demand Draf", value: "dd" },
            { text: "Other", value: "other" },
        ],
        validatorRules: ["notRequired"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    fees_remarks: {
        label: "Fees remarks",
        type: "textarea",
        value: "",
        validatorRules: ["notRequired"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};

export const studentFeeFormFields = {
    payment_date: {
        label: "Date of payment",
        type: "date",
        value: new Date().toISOString().slice(0, 10),
        validatorRules: ["notEmpty", "validDate"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    amount_paid: {
        label: "Amount paid",
        type: "number",
        value: "0",
        validatorRules: ["notRequired", "min|1000", "max|100000"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    transaction_serial_number: {
        label: "Transaction Serial Number",
        type: "text",
        value: "",
        validatorRules: ["notRequired"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    module_name: {
        label: "",
        type: "hidden",
        value: "student-fee",
        validatorRules: ["notRequired"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    transaction_mode: {
        label: "Transaction mode",
        type: "select",
        value: "cash",
        options: [
            { text: "Card", value: "card" },
            { text: "Internet banking", value: "intb" },
            { text: "Neft", value: "neft" },
            { text: "RTGS", value: "rtgs" },
            { text: "UPI", value: "upi" },
            { text: "Cash", value: "cash" },
            { text: "Cheque", value: "chq" },
            { text: "Demand Draf", value: "dd" },
            { text: "Other", value: "other" },
        ],
        validatorRules: ["notRequired"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    fees_remarks: {
        label: "Fees remarks",
        type: "textarea",
        value: "",
        validatorRules: ["notRequired"],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    "student_fee_payment_pic[]": {
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
        maxNumberOfFiles: 10,
        previewElementStyle:
            "flex flex-wrap border border-dashed gap-2 p-2 w-full top-0 left-0 min-h-[100px]",
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
        label: `Select Payment Picture/Screenshots to upload`,
    },
};

// configurations for students attendance form fields

export let studentAttendanceStatusFormField = {
    "is_present[]": {
        label: "",
        value: "unchecked",
        type: "toggle",
        options: { checked: "Present", unchecked: "Absent" },
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};

export const studentAttendanceRemarkFormField = {
    "remark[]": {
        label: "Remark",
        value: "",
        type: "textarea",
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};
export const studentAttendanceEarlyLeaveFormField = {
    "late_entry_by_minutes[]": {
        label: "Late entry in minutes",
        value: "0",
        type: "select",
        options: [
            {
                text: "0",
                value: 0,
            },
            {
                text: "5",
                value: 5,
            },
            {
                text: "10",
                value: 10,
            },
            {
                text: "15",
                value: 15,
            },
            {
                text: "20",
                value: 20,
            },
            {
                text: "25",
                value: 25,
            },
            {
                text: "30",
                value: 30,
            },
            {
                text: "35",
                value: 35,
            },
            {
                text: "40",
                value: 40,
            },
            {
                text: "45",
                value: 45,
            },
        ],
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
    "early_leave_by_minutes[]": {
        label: "Early Leave in minutes",
        value: "0",
        type: "select",
        options: [
            {
                text: "0",
                value: 0,
            },
            {
                text: "5",
                value: 5,
            },
            {
                text: "10",
                value: 10,
            },
            {
                text: "15",
                value: 15,
            },
            {
                text: "20",
                value: 20,
            },
            {
                text: "25",
                value: 25,
            },
            {
                text: "30",
                value: 30,
            },
            {
                text: "35",
                value: 35,
            },
            {
                text: "40",
                value: 40,
            },
            {
                text: "45",
                value: 45,
            },
        ],
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};
export const studentAttendanceOnLeaveFormField = {
    "is_leave_uninformed[]": {
        label: "",
        value: "unchecked",
        type: "toggle",
        options: { checked: "Informed Leave", unchecked: "Uninformed Leave" },
        validatorRules: [],
        fieldValidationStatus: {
            isInvalid: false,
            message: "",
        },
    },
};
