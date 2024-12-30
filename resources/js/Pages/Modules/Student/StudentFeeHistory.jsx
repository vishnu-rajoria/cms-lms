import Badge from "@/Components/Badge";
import { formattedMysqlDateAndTime } from "@/Helpers/TimeHelper";
import { useState } from "react";
import StudentFeesForm from "@/Forms/StudentFeesForm";

export default function StudentFeeHistory({
    studentFeeSaveSuccessHandler,
    studentId,
    studentFeeHistoryData,
    ...props
}) {
    const [isAddFeeFormVisible, setIsAddFeeFormVisible] = useState(false);

    function showFeesHistory() {
        setIsAddFeeFormVisible(!isAddFeeFormVisible);
    }

    return (
        <>
            {!isAddFeeFormVisible && (
                <div className="fees-history">
                    <h1 class="text-lg font-bold text-gray-200 py-6 flex justify-between">
                        Fee History
                        <button
                            className="btn btn-link"
                            onClick={() => {
                                setIsAddFeeFormVisible(!isAddFeeFormVisible);
                            }}
                        >
                            Add payment
                        </button>
                    </h1>
                    <div class="grid gap-1">
                        {studentFeeHistoryData.map(
                            (studentFeeHistoryRecord) => {
                                return (
                                    <div class="bg-gray-200 flex gap-2 items-center p-2 rounded-lg">
                                        <div className="date text-sm w-[200px] bg-indigo-600 text-gray-300 rounded-md p-2 select-none">
                                            {
                                                formattedMysqlDateAndTime(
                                                    studentFeeHistoryRecord.payment_date.slice(
                                                        0,
                                                        10
                                                    )
                                                ).split("/")[0]
                                            }
                                            <br></br>
                                            {
                                                formattedMysqlDateAndTime(
                                                    studentFeeHistoryRecord.payment_date.slice(
                                                        0,
                                                        10
                                                    )
                                                ).split("/")[1]
                                            }
                                        </div>
                                        <div className="amount w-[150px] text-center text-xl font-bold">
                                            ₹
                                            {studentFeeHistoryRecord.fee_amount}
                                            /-
                                        </div>

                                        <div className="fee-mode grow  capitalize">
                                            {studentFeeHistoryRecord.fee_mode}
                                        </div>
                                        {/* <div className="fee-mode">
                            <button class="btn btn-link">receipt</button>
                        </div> */}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
            {isAddFeeFormVisible && (
                <div>
                    <h1 class="text-lg font-bold text-gray-200 py-6 flex justify-between">
                        Add Payment
                        <button
                            className="btn btn-link"
                            onClick={() => {
                                setIsAddFeeFormVisible(!isAddFeeFormVisible);
                            }}
                        >
                            Back to fee history
                        </button>
                    </h1>
                    <StudentFeesForm
                        studentFeeSaveSuccessHandler={
                            studentFeeSaveSuccessHandler
                        }
                        showFeesHistory={() => showFeesHistory()}
                        studentId={studentId}
                    />
                </div>
            )}
        </>
    );
}
