import Badge from "@/Components/Badge";
import { format } from "date-fns";
import { toDate } from "date-fns";
import parseISO from "date-fns/parseISO";
import { formatDistance } from "date-fns";
import { formatISO } from "date-fns";
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
                    return (
                        <Badge
                            title="Full Stack Web Development"
                            className="border border-green-500 dark:text-green-300 dark:bg-emerald-800 "
                        >
                            FSWD
                        </Badge>
                    );
                    break;
                case 2:
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
            return (
                format(
                    formatISO(parseISO(row.created_at), {
                        representation: "date",
                    }),
                    "dd-L-yyyy"
                ) +
                " / " +
                formatDistance(new Date(), parseISO(row.created_at)) +
                " ago "
            );
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
    course: {
        label: "Course",
        value: "1",
        type: "select",
        options: [
            {
                value: "1",
                text: "Full Stack Web Development",
            },
            {
                value: "2",
                text: "Web Design",
            },
            {
                value: "3",
                text: "Python",
            },
        ],
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

// configurations for students attendance form fields

// Configuration for student registration form fields
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
