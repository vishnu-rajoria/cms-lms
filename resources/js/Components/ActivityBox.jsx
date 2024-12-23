export default function ActivityBox({
    date,
    cssClass,
    attendanceInfo,
    ...props
}) {
    let colorClasses = "bg-slate-600 text-slate-400";
    if (attendanceInfo) {
        colorClasses = attendanceInfo.is_present
            ? "bg-green-600 text-green-200"
            : "bg-red-600 text-red-200";
        console.log(attendanceInfo);
    }

    return (
        <div
            className={
                "transition-all duration-300 activity-box w-[14px] h-[14px] rounded-sm " +
                colorClasses
            }
            title={date.toISOString().slice(0, 10)}
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
