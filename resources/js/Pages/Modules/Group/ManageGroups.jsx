import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Dropdown from "@/Components/Dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import GroupRegistrationForm from "@/Forms/GroupRegistrationForm";
import DataTable, { createTheme } from "react-data-table-component";
import { CreateDarkTableTheme } from "@/Helpers/ThemeHelper";
import { GroupsTableColumnsMini } from "@/Data/Group";
import IconGroup from "@/Components/IconGroup";
import { format, formatISO, parseISO, formatDistance } from "date-fns";
import { getGroupIconURL, getStudentImageURL } from "@/Helpers/ImageHelper";
import { toast } from "react-toastify";
import axios from "axios";
// createTheme creates a new theme named solarized that overrides the build in dark theme
const baseURL = import.meta.env.VITE_APP_URL;
CreateDarkTableTheme();
export default function ManageGroups() {
    const baseURL = import.meta.env.VITE_APP_URL;
    const [previouslySavedGroupsData, setPreviouslySavedGroupsData] = useState(
        []
    );
    const [
        currentlySelectedGroupGroupOption,
        setCurrentlySelectedGroupGroupOption,
    ] = useState(0);

    const [groups, setGroups] = useState([]);
    const [pending, setPending] = useState(true);
    const [isRowsSelected, setIsRowsSelected] = useState(false);
    const [selectedRowsImages, setSelectedRowsImages] = useState([]);
    const [selectedGroupsId, setSelectedGroupsId] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [tableTheme, setTableTheme] = useState("solarized");

    // Function to set the initial theme for the table
    // function initiateTheme() {
    //     // Retrieve the previously saved theme mode from localStorage
    //     let previouslySavedMode = localStorage.getItem("current-theme-mode");

    //     // Set the table theme based on the retrieved mode
    //     if (previouslySavedMode === null || previouslySavedMode == "light") {
    //         setTableTheme("light");
    //     } else {
    //         setTableTheme("solarized");
    //     }
    //

    function recoverPreviouslySelectedGroupGroupOption() {
        let previouslySavedGroupsGroupOption = localStorage.getItem(
            "currentlySelectedGroupGroupOption"
        );
        if (previouslySavedGroupsGroupOption != null) {
            setCurrentlySelectedGroupGroupOption(
                previouslySavedGroupsGroupOption
            );
        }
    }

    /**
     * Fetches the list of Groups from the server and updates the state
     * with the received data
     *
     * This function displays a loading toast message at the bottom-right
     * corner of the screen while the data is being fetched. Once the data
     * is received, the toast message is updated to indicate successful
     * data loading. If an error occurs, the toast message is updated to
     * show an error message.
     */
    function getGroups() {
        if (groups.length < 1) {
            // Display a loading toast message at the bottom-right
            const toastId = toast.loading("loading data...", {
                position: "bottom-right",
            });

            axios
                .get(baseURL + "/api/get-groups")
                .then(function (response) {
                    // Log the response from the server
                    // console.log("Response from server");
                    // console.log(response.data.Groups);
                    // Update the Groups state with the data from the server
                    setGroups(response.data.groups);
                    // Set pending state to false indicating data fetch completion
                    setPreviouslySavedGroupsData(response.data.Groups);
                    setPending(false);
                    // Update the toast message to indicate successful data loading
                    toast.update(toastId, {
                        render: "Data loaded Successfully",
                        type: "success",
                        isLoading: false,
                        autoClose: 2000,
                    });
                    setShowTable(true);
                })
                .catch(function (error) {
                    // Log the error from the server
                    // console.log("Error from server");
                    // console.log(error);
                    // Optionally, you can update the toast to show an error message
                    toast.update(toastId, {
                        render: "Data loadeding failed",
                        type: "error",
                        isLoading: false,
                        autoClose: 2000,
                    });
                });
        }
    }

    /**
     * Opens the modal to create a new batch
     */
    function createNewbatch() {
        // alert("Create new batch");
        setShowModal(true);
    }

    function displayGroupsRecords() {
        console.log("displayGroupsRecords is running : ");
        getGroups();
    }

    function groupSelectorHandler(selectedValue) {
        //  displayGroupsRecords(selectedValue);
        setCurrentlySelectedGroupGroupOption(selectedValue);
        localStorage.setItem(
            "currentlySelectedGroupGroupOption",
            selectedValue
        );
    }

    function groupRegistrationResponseHandler(response) {
        console.log(" inside groupRegistrationRespnseHandler response is : ");
        if (response.data.status == "success") {
            setShowModal(false);
        }
    }
    useEffect(() => {
        // recoverPreviouslySelectedGroupGroupOption();
        console.log(
            "displaying record for option : " +
                currentlySelectedGroupGroupOption
        );
        displayGroupsRecords();
    }, [currentlySelectedGroupGroupOption]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4 flex-wrap justify-between">
                    <h2>Groups </h2>

                    <Link className="btn" href={baseURL + "/group-module-help"}>
                        Help
                    </Link>
                </div>
            }
        >
            <Head title="Groups" />

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <GroupRegistrationForm
                    imagesURL={selectedRowsImages}
                    selectedId={selectedGroupsId}
                    responseHandler={groupRegistrationResponseHandler}
                ></GroupRegistrationForm>
            </Modal>

            {isRowsSelected && (
                <div className="flex justify-center sticky top-0 dark:bg-slate-800 z-10 flex-wrap gap-2">
                    <PrimaryButton
                        className="shrink-0"
                        onClick={createNewbatch}
                    >
                        Create Group
                    </PrimaryButton>
                    <PrimaryButton
                        className="shrink-0"
                        onClick={createNewbatch}
                    >
                        Assign Existing Group
                    </PrimaryButton>

                    <PrimaryButton
                        className="shrink-0"
                        onClick={createNewbatch}
                    >
                        Remove
                    </PrimaryButton>
                    <PrimaryButton
                        className="shrink-0"
                        onClick={createNewbatch}
                    >
                        Block
                    </PrimaryButton>
                </div>
            )}
            <div className="group-card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2">
                {groups.map((group) => {
                    let picsForIconGroup = [];
                    group.members_info_limited.forEach((record) => {
                        picsForIconGroup.push(
                            getStudentImageURL(record.id, record.profile_pic)
                        );
                    });
                    let formattedDate = format(
                        formatISO(parseISO(group.created_at), {
                            representation: "date",
                        }),
                        "dd-L-yyyy"
                    );
                    let created_at = (
                        <span title={formattedDate}>
                            {formatDistance(
                                new Date(),
                                parseISO(group.created_at)
                            ) + " ago "}
                        </span>
                    );

                    return (
                        <div
                            key={"group-card-" + group.id}
                            className="group-card gap-2 flex text-gray-700 dark:text-gray-300 items-start bg-slate-300 dark:bg-slate-900 p-6 rounded-lg"
                        >
                            <img
                                className="w-[50px] rounded-full"
                                src={getGroupIconURL(
                                    group.id,
                                    group.group_icon
                                )}
                            />

                            <div className="card-content grid gap-2 flex-grow">
                                <div className="group-header">
                                    <h3 className="text-xl font-bold capitalize">
                                        {group.name}
                                    </h3>
                                </div>

                                <IconGroup
                                    className=""
                                    max={5}
                                    size="md"
                                    total={group.members_count}
                                    imagesURL={picsForIconGroup}
                                />

                                <div className="text-xs mt-6 text-slate-600">
                                    {created_at}
                                </div>
                            </div>
                            <div className="flex flex-col justify-between items-end h-full">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-full border border-transparent bg-slate-300 p-1 bg-opacity-20 opacity-50 hover:opacity-75 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-[15px] h-[15px] dark:invert"
                                                    viewBox="0 0 16 16"
                                                    fill="#fff"
                                                >
                                                    <path
                                                        d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z"
                                                        fill="#000"
                                                    />
                                                    <path
                                                        d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z"
                                                        fill="#000000"
                                                    />
                                                    <path
                                                        d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z"
                                                        fill="#000000"
                                                    />
                                                    <script xmlns="" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Edit
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="bg-red-900 text-white hover:bg-red-600"
                                        >
                                            delete
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                                <Link
                                    href={route("view.group.info", {
                                        group_id: group.id,
                                    })}
                                    className="w-[30px] h-[30px] bg-slate-700 p-2 rounded-full hover:bg-green-600 transition-all ease-in-out duration-300 flex items-center justify-center"
                                >
                                    <img
                                        className="h-full invert"
                                        src="https://www.svgrepo.com/show/449159/next.svg"
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <div className="mt-6 overflow-hidden bg-white dark:bg-gray-900 shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <div className="px-4 mb-4 flex items-center gap-4 nobr me-auto text-slate-400">
                        <h3>Select a Group group</h3>
                        <div>
                            <DropdownInput
                                name="group-selector"
                                type="select"
                                id="group-selector"
                                key="group-selector"
                                options={[
                                    {
                                        value: "0",
                                        text: "No Group Selected",
                                    },
                                    {
                                        value: "all",
                                        text: "All Groups",
                                    },
                                    {
                                        value: "1",
                                        text: "Group 1",
                                    },
                                    {
                                        value: "2",
                                        text: "Group 2",
                                    },
                                ]}
                                value={currentlySelectedGroupGroupOption}
                                onChange={(e) =>
                                    groupSelectorHandler(e.target.value)
                                }
                            ></DropdownInput>
                        </div>
                    </div>

                    {showTable ? (
                        <DataTable
                            // expandableRows
                            // expandableRowsComponent={ExpandedComponent}
                            theme={tableTheme}
                            progressPending={pending}
                            columns={GroupsTableColumnsMini}
                            data={Groups}
                            selectableRows
                            highlightOnHover
                            fixedheader
                            pagination
                            paginationRowsPerPageOptions={[1, 5, 10, 15]}
                            paginationPerPage={10}
                            onSelectedRowsChange={(selectedRows) => {
                                console.log("Selcted rows are");
                                console.log(selectedRows);

                                let selectedRowsImages = selectedRows[
                                    "selectedRows"
                                ].map((row) => {
                                    if (row.profile_pic) {
                                        return `${baseURL}/storage/Groups/${row.id}/profile_pictures/${row.profile_pic}`;
                                    } else {
                                        return `${baseURL}/storage/dummy/profile_pic.jpg`;
                                    }
                                });
                                let selectedId = selectedRows[
                                    "selectedRows"
                                ].map((row) => {
                                    return row.id;
                                });
                                setSelectedGroupsId(selectedId);
                                setSelectedRowsImages(selectedRowsImages);
                                console.log("profile pics are : ");
                                console.log(selectedRowsImages);

                                if (selectedRows.selectedCount > 0) {
                                    console.log("More than one row selected");
                                    setIsRowsSelected(true);
                                } else {
                                    setIsRowsSelected(false);
                                }
                            }}
                            // pagination
                            // paginationRowsPerPageOptions={[1, 5]}
                        ></DataTable>
                    ) : (
                        <div className="text-white text-center">
                            Please Select a group
                        </div>
                    )}
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
