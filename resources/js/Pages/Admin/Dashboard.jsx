import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { getMonthNameFromNumber } from "@/Helpers/TimeHelper";
import BarChartCSLAB from "@/Components/Charts/BarChartCSLAB";

import axios from "axios";
/**
 * The admin dashboard
 *
 * @param {object} props
 * @param {object} props.series - The data for the chart
 * @property {string} props.series.name - The name of the series
 * @property {Array} props.series.data - The data for the series
 * @returns {React.ReactElement} The admin dashboard component
 */
export default function Dashboard({}) {
    /**
     * The series data for Canada
     * @type {{name: string, data: Array<number>}}
     */

    const [
        studentRegistrationMonthlyCountSeries,
        setStudentRegistrationMonthlyCountSeries,
    ] = useState([]);
    const [
        studentRegistrationMonthlyXAxisLabelsData,
        setStudentRegistrationMonthlyXAxisLabelsData,
    ] = useState([]);

    function loadStudentMonthlyRegistrationData() {
        let getStudentMonthlyRegistrationDataURL = route(
            "get.monthly.registration.report"
        );
        axios
            .post(getStudentMonthlyRegistrationDataURL)
            .then((response) => {
                console.log(
                    "before setting response.data.studentRegistrationmonthlyData"
                );
                console.log(response.data.studentRegistrationmonthlyData);

                let data = response.data.studentRegistrationmonthlyData;
                let series = Object.keys(data)
                    .reverse()
                    .map((key) => {
                        return data[key];
                    });
                setStudentRegistrationMonthlyCountSeries(series);
                let xAxisData = Object.keys(data)
                    .reverse()
                    .map((key) => {
                        let monthAndYearArray = key.split("-");
                        let month = parseInt(monthAndYearArray[0]);
                        let year = monthAndYearArray[1];
                        return getMonthNameFromNumber(month) + " " + year;
                    });
                setStudentRegistrationMonthlyXAxisLabelsData(xAxisData);
            })
            .catch((error) => {});
    }

    useEffect(() => {
        loadStudentMonthlyRegistrationData();
    }, []);
    return (
        <AuthenticatedLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-white bg-[rgb(16,12,42)]">
                    <BarChartCSLAB
                        theme="dark"
                        series={studentRegistrationMonthlyCountSeries}
                        xAxisLabelsData={
                            studentRegistrationMonthlyXAxisLabelsData
                        }
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
