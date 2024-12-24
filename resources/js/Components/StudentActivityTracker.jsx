// Date to be passed like this: '2023-01-01'
import { baseURL } from "@/Env";
import ActivityBox from "./ActivityBox";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function StudentActivityTracker({
    startingDate,
    studentId,
    groupId,
}) {
    const daysInMonthArray = getDaysInMonthArray(
        startingDate,
        new Date().toISOString().slice(0, 10)
    );

    const [studentAttendance, setStudentAttendance] = useState([]);

    function getStudentAttendance(studentId, groupId) {
        // Display a loading toast message at the bottom-right
        // const toastId = toast.loading("loading data...", {
        //     position: "bottom-right",
        // });

        axios
            .get(
                baseURL +
                    "/api/get-group-student-attendance/" +
                    studentId +
                    "/" +
                    groupId
            )
            .then(function (response) {
                // toast.update(toastId, {
                //     render: "Data loaded successfully",
                //     type: "success",
                //     isLoading: false,
                //     autoClose: 5000,
                // });
                setStudentAttendance(response.data.studentAttendance);
            })
            .catch(function (error) {
                // toast.update(toastId, {
                //     render: "Data loadeding failed",
                //     type: "error",
                //     isLoading: false,
                //     autoClose: 5000,
                // });
            });
    }

    useEffect(() => {
        getStudentAttendance(studentId, groupId);
    }, []);

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap text-gray-400">
            {/* {JSON.stringify(studentAttendance)} */}
            <h2 className="text-xl">
                {/* Student Activity Tracker from {startingDate}
                {JSON.stringify(daysInMonthArray)} */}
                <div className="month-activity-container text-white flex gap-2 flex-wrap justify-center">
                    {daysInMonthArray.map((dayDetails, index) => {
                        return (
                            <div
                                key={"activity" + index}
                                className="flex flex-col "
                            >
                                <div className="month-name text-xs">
                                    {dayDetails.monthName} {dayDetails.year}
                                </div>
                                <div className="days-container grid grid-cols-7 gap-1">
                                    {Array.from({
                                        length: dayDetails.days,
                                    }).map((_, index) => {
                                        return (
                                            <ActivityBox
                                                key={index}
                                                attendanceInfo={
                                                    studentAttendance[
                                                        `${dayDetails.year}-${
                                                            dayDetails.month <
                                                            10
                                                                ? "0" +
                                                                  dayDetails.month
                                                                : dayDetails.month
                                                        }-${
                                                            index + 1 < 10
                                                                ? "0" +
                                                                  (index + 1)
                                                                : index + 1
                                                        }`
                                                    ]
                                                }
                                                cssClass=""
                                                date={
                                                    new Date(
                                                        dayDetails.year,
                                                        dayDetails.month - 1,
                                                        index + 1,
                                                        18,
                                                        30,
                                                        30
                                                    )
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </h2>
        </div>
    );
}

function getNumberOfDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function getDaysInMonthArray(startingDate, endDate) {
    const splittedDate = startingDate.split("-");
    const splittedEndDate = endDate.split("-");
    const startingYear = parseInt(splittedDate[0]);
    const startingMonth = parseInt(splittedDate[1]);
    const endYear = parseInt(splittedEndDate[0]);
    const endMonth = parseInt(splittedEndDate[1]);

    let daysInMonthArray = [];
    let month = startingMonth;
    let year = startingYear;
    while (year < endYear || month < endMonth) {
        // console.log("Month: " + month + " Year: " + year);
        daysInMonthArray.push({
            month: month,
            year: year,
            days: getNumberOfDaysInMonth(month, year),
            monthName: new Date(year, month - 1, 1).toLocaleString("default", {
                month: "long",
            }),
        });
        if (month > 11) {
            month = 0;
            year++;
        }
        month++;
    }
    daysInMonthArray.push({
        month: endMonth,
        year: endYear,
        days: getNumberOfDaysInMonth(month, year),
        monthName: new Date(year, month - 1, 1).toLocaleString("default", {
            month: "long",
        }),
    });
    return daysInMonthArray;
}
