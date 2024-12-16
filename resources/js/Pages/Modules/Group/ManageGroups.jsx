import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DropdownInput from "@/Components/DropdownInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import GroupRegistrationForm from "@/Forms/GroupRegistrationForm";
import DataTable, { createTheme } from "react-data-table-component";
import { CreateDarkTableTheme } from "@/Helpers/ThemeHelper";
import { GroupsTableColumnsMini } from "@/Data/Group";
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

    const [Groups, setGroups] = useState([]);
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
    function getGroups(type) {
        // Display a loading toast message at the bottom-right
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });

        setShowTable(true);
        axios
            .get(baseURL + "/api/get-groups/" + type)
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

    /**
     * Opens the modal to create a new batch
     */
    function createNewbatch() {
        // alert("Create new batch");
        setShowModal(true);
    }

    function displayGroupsRecords(selectedOption) {
        if (selectedOption == "all") {
            console.log("Display all Groups list");
            getGroups(selectedOption);
        } else {
            console.log("Display Groups list for group " + selectedOption);
        }
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
        recoverPreviouslySelectedGroupGroupOption();
        console.log(
            "displaying record for option : " +
                currentlySelectedGroupGroupOption
        );
        displayGroupsRecords(currentlySelectedGroupGroupOption);
    }, [currentlySelectedGroupGroupOption]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4 flex-wrap">
                    <h2>Groups </h2>

                    <Link
                        className="btn"
                        href={baseURL + "/admin/register-Group"}
                    >
                        Register Group
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

            <div className="overflow-hidden bg-white dark:bg-gray-900 shadow-sm sm:rounded-lg">
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
            </div>
        </AuthenticatedLayout>
    );
}
