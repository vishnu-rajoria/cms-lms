import { getDayName } from "@/Helpers/TimeHelper";
export default function ActivityBox({
    date,
    cssClass,
    attendanceInfo,
    ...props
}) {
    let colorClasses =
        "bg-slate-900 text-white dark:bg-slate-600 dark:text-slate-400";
    let dayName = getDayName(date);
    if (dayName === "Saturday" || dayName === "Sunday") {
        colorClasses =
            "bg-slate-300 text-slate-400  dark:bg-slate-800 dark:text-white";
    }
    if (attendanceInfo) {
        colorClasses = attendanceInfo.is_present
            ? "bg-green-600 text-green-200"
            : attendanceInfo.is_leave_uninformed
            ? "bg-red-600 text-red-200"
            : "bg-orange-400 text-black";
        console.log(attendanceInfo);
    }
    return (
        <div
            className={
                "transition-all duration-300 activity-box w-[14px] h-[14px] rounded-sm " +
                colorClasses
            }
            title={date.toISOString().slice(0, 10) + " | " + dayName}
        >
            {/* {console.log(attendanceInfo)} */}
            <div
                className={
                    "text-xs scale-[0.6] mt-[-2px] grid place-content-center text-center " +
                    colorClasses
                }
            >
                {date.toISOString().slice(8, 10)}
            </div>
        </div>
    );
}
