import Badge from "@/Components/Badge";
import { formattedMysqlDateAndTime } from "@/Helpers/TimeHelper";
import { useState } from "react";
import StudentFeesForm from "@/Forms/StudentFeesForm";
import { Link } from "@inertiajs/react";
import axios from "axios";

export default function StudentFeeHistory({
    studentFeeSaveSuccessHandler,
    studentDetails,
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
                                        <div className="fee-mode">
                                            <form
                                                // let downloadReceiptFormId={"download-student-fee-receipt-" + studentFeeHistoryRecord.id}
                                                method="post"
                                                action={route(
                                                    "api.download.student.fees.pdf"
                                                )}
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    let submitURL =
                                                        e.target.action;
                                                    let formData = new FormData(
                                                        e.target
                                                    );
                                                    axios({
                                                        url: submitURL,
                                                        responseType: "blob",
                                                        method: "POST",
                                                        data: {
                                                            student_id:
                                                                studentFeeHistoryRecord.student_id,
                                                            receipt_id:
                                                                studentFeeHistoryRecord.id,
                                                        },
                                                    }).then((response) => {
                                                        const url =
                                                            window.URL.createObjectURL(
                                                                new Blob([
                                                                    response.data,
                                                                ])
                                                            );
                                                        const link =
                                                            document.createElement(
                                                                "a"
                                                            );
                                                        link.href = url;
                                                        link.setAttribute(
                                                            "download",
                                                            "receipt-" +
                                                                studentDetails.name +
                                                                "-" +
                                                                studentDetails.id +
                                                                "-" +
                                                                studentFeeHistoryRecord.payment_date +
                                                                ".pdf"
                                                        );
                                                        document.body.appendChild(
                                                            link
                                                        );
                                                        link.click();
                                                    });
                                                }}
                                            >
                                                <input
                                                    type="text"
                                                    name="student_fee_record_id"
                                                    value={
                                                        studentFeeHistoryRecord.id
                                                    }
                                                    hidden
                                                />
                                                <button className="btn btn-link">
                                                    Receipt
                                                </button>
                                            </form>
                                        </div>
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
                        studentId={studentDetails.id}
                    />
                </div>
            )}
        </>
    );
}
