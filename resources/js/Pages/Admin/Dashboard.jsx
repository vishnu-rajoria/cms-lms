import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

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
    const series = [
        {
            name: "Canada",
            data: [
                3.9670002, 5.2650003, 6.201, 7.8010006, 9.694, 11.214001,
                11.973001, 12.250001, 12.816001, 13.413001, 13.626961, 14.30356,
                15.295461,
            ],
        },
        {
            name: "India",
            data: [
                1.9670002, 9.2650003, 3.201, 8.8010006, 11.694, 5.214001,
                5.973001, 10.250001, 12.816001, 15.413001, 18.626961, 10.30356,
                8.295461,
            ],
        },
    ];

    return (
        <AuthenticatedLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-white">
                    <div className="w-[400px]">
                        <VictoryChart
                            theme={VictoryTheme.clean}
                            animate={{ duration: 500 }}
                        >
                            <VictoryLine
                                data={series[0].data.map((d, i) => ({
                                    x: i + 2010,
                                    y: d,
                                }))}
                                style={{
                                    data: {
                                        stroke: "orange",
                                    },
                                }}
                            />

                            <VictoryLine
                                data={series[1].data.map((d, i) => ({
                                    x: i + 2010,
                                    y: d,
                                }))}
                            />
                        </VictoryChart>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
