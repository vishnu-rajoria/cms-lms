import { useState, useEffect } from "react";
import DropdownInput from "@/Components/DropdownInput";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";
import Modal from "@/Components/Modal";
import { toast } from "react-toastify";
import DataTable, { createTheme } from "react-data-table-component";
import { CreateDarkTableTheme } from "@/Helpers/ThemeHelper";
import { studentsTableColumnsMini } from "@/Data/Student";
import GroupRegistrationForm from "@/Forms/GroupRegistrationForm";
import AssignStudentToGroupForm from "@/Forms/AssignStudentToGroupForm";
CreateDarkTableTheme();

export default function StudentsTable({ groupId }) {
    const baseURL = import.meta.env.VITE_APP_URL;
    const [groupList, setGroupList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [isRowsSelected, setIsRowsSelected] = useState(false);
    const [previouslySavedStudentsData, setPreviouslySavedStudentsData] =
        useState([]);
    const [
        currentlySelectedStudentGroupOption,
        setCurrentlySelectedStudentGroupOption,
    ] = useState(0);
    const [students, setStudents] = useState([]);
    const [pending, setPending] = useState(true);
    const [selectedRowsImages, setSelectedRowsImages] = useState([]);
    const [selectedStudentsId, setSelectedStudentsId] = useState([]);

    const [tableTheme, setTableTheme] = useState("solarized");
    const [showGroupRegistrationForm, setShowGroupRegistrationForm] =
        useState(false);
    const [showAssignStudentToGroupForm, setShowAssignStudentToGroupForm] =
        useState(false);

    function recoverPreviouslySelectedStudentGroupOption() {
        let previouslySavedStudentsGroupOption = localStorage.getItem(
            "currentlySelectedStudentGroupOption"
        );
        if (previouslySavedStudentsGroupOption != null) {
            setCurrentlySelectedStudentGroupOption(
                previouslySavedStudentsGroupOption
            );
        }
    }

    function groupSelectorHandler(selectedValue) {
        //  displayStudentsRecords(selectedValue);
        setCurrentlySelectedStudentGroupOption(selectedValue);
        localStorage.setItem(
            "currentlySelectedStudentGroupOption",
            selectedValue
        );
    }

    function displayStudentsRecords(selectedOption) {
        if (selectedOption == "all") {
            console.log("Display all students list");
            getStudents(selectedOption);
        } else {
            console.log("Display students list for group " + selectedOption);
        }
    }

/**
 * getGroupList() function
 * Fetches the list of groups from the server and updates the groupList state.
 * If the groupList is already populated, the function returns early to avoid
 * redundant network requests. Logs the server response or error for debugging.
 */

    function getGroupList() {
        if (groupList.length > 0) return;
        axios
            .get(baseURL + "/api/get-groups")
            .then(function (response) {
                // Log the response from the server
                console.log("Response from server");
                console.log(response);
                setGroupList(response.data.groups);
            })
            .catch(function (error) {
                // Log the error from the server
                console.log("Error from server");
                console.log(error.response.data);
            });
    }
    function getStudents(type) {
        // Display a loading toast message at the bottom-right
        const toastId = toast.loading("loading data...", {
            position: "bottom-right",
        });

        setShowTable(true);
        axios
            .get(baseURL + `/api/get-students/${groupId}`)
            .then(function (response) {
                // Log the response from the server
                // console.log("Response from server");
                // console.log(response.data.students);
                // Update the students state with the data from the server
                setStudents(response.data.students);
                // Set pending state to false indicating data fetch completion
                setPreviouslySavedStudentsData(response.data.students);
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
        setShowAssignStudentToGroupForm(false);
        setShowGroupRegistrationForm(true);
    }

    function assignToExistingBatch() {
        setShowModal(true);
        setShowAssignStudentToGroupForm(true);
        setShowGroupRegistrationForm(false);
    }

    function groupRegistrationResponseHandler(response) {
        console.log(" inside groupRegistrationRespnseHandler response is : ");
        if (response.data.status == "success") {
            setShowModal(false);
        }
    }

    useEffect(() => {
        recoverPreviouslySelectedStudentGroupOption();
        console.log(
            "displaying record for option : " +
                currentlySelectedStudentGroupOption
        );
        displayStudentsRecords(currentlySelectedStudentGroupOption);

        getGroupList();
    }, [currentlySelectedStudentGroupOption]);

    return (
        <div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {showAssignStudentToGroupForm && (
                    <AssignStudentToGroupForm
                        groupList={groupList}
                        imagesURL={selectedRowsImages}
                        selectedId={selectedStudentsId}
                        responseHandler={groupRegistrationResponseHandler}
                    />
                )}
                {showGroupRegistrationForm && (
                    <GroupRegistrationForm
                        imagesURL={selectedRowsImages}
                        selectedId={selectedStudentsId}
                        responseHandler={groupRegistrationResponseHandler}
                    ></GroupRegistrationForm>
                )}
            </Modal>

            {isRowsSelected && (
                <div className="flex justify-center sticky top-0 dark:bg-slate-700 z-[1] flex-wrap gap-2 py-1">
                    <PrimaryButton
                        className="shrink-0"
                        onClick={createNewbatch}
                    >
                        Create Group
                    </PrimaryButton>
                    <PrimaryButton
                        className="shrink-0"
                        onClick={assignToExistingBatch}
                    >
                        Assign Existing Group
                    </PrimaryButton>
                    {selectedRowsImages.length == 1 && (
                        <PrimaryButton
                            className="shrink-0"
                            onClick={assignToExistingBatch}
                        >
                            Edit
                        </PrimaryButton>
                    )}

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
                    {groupId == "all" && (
                        <div className="px-4 mb-4 flex items-center gap-4 nobr me-auto text-slate-400">
                            <h3>Select a student group</h3>
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
                                            text: "All Students",
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
                                    value={currentlySelectedStudentGroupOption}
                                    onChange={(e) =>
                                        groupSelectorHandler(e.target.value)
                                    }
                                ></DropdownInput>
                            </div>
                        </div>
                    )}
                    {showTable ? (
                        <DataTable
                            // expandableRows
                            // expandableRowsComponent={ExpandedComponent}
                            theme={tableTheme}
                            progressPending={pending}
                            columns={studentsTableColumnsMini}
                            data={students}
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
                                        return `${baseURL}/storage/students/${row.id}/profile_pics/${row.profile_pic}`;
                                    } else {
                                        return `${baseURL}/storage/dummy/profile_pic.jpg`;
                                    }
                                });
                                let selectedId = selectedRows[
                                    "selectedRows"
                                ].map((row) => {
                                    return row.id;
                                });
                                setSelectedStudentsId(selectedId);
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
        </div>
    );
}
