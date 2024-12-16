import { format } from "date-fns";
import { formatISO, parseISO, formatDistance } from "date-fns";
import IconGroup from "@/Components/IconGroup";
const baseURL = import.meta.env.VITE_APP_URL;

export const GroupsTableColumnsMini = [
    {
        name: "",
        selector: (row, index) => {
            if (row.group_icon) {
                return (
                    <a href="#">
                        <img
                            className="w-[50px] rounded-full p-2"
                            src={`${baseURL}/storage/groups/${row.id}/group_icon/${row.group_icon}`}
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
        name: "Members",
        selector: (row) => {
            let picsForIconGroup = [];
            row.members_info_limited.forEach((record) => {
                picsForIconGroup.push(record.profile_pic);
            });
            return (
                <>
                    <IconGroup
                        className="p-5"
                        max={5}
                        size="md"
                        total={row.members_count}
                        imagesURL={picsForIconGroup}
                    />
                </>
            );
        },
        sortable: true,
        // width: "150px",
    },
    {
        name: "Created at",
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
