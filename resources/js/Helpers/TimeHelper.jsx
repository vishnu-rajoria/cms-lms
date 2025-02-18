import { format } from "date-fns";
import { toDate } from "date-fns";
import parseISO from "date-fns/parseISO";
import { formatDistance } from "date-fns";
import { formatISO } from "date-fns";

export function formattedMysqlDateAndTime(dateString) {
    let dateParts = dateString.split("-");
    let year = dateParts[0];
    let month = dateParts[1];
    let day = dateParts[2];
    let formattedDate = new Date(year, month - 1, day);
    // console.log(formattedDate) + "";
    return (
        format(
            formatISO(formattedDate, {
                representation: "date",
            }),
            "dd-MMMM-yyyy"
        ) +
        " / " +
        formatDistance(new Date(), formattedDate) +
        " ago "
    );
}

export function formatMySqlTimestamp(timestampString) {
    let formattedDate = new Date(timestampString);
    return (
        format(
            formatISO(timestampString, {
                representation: "date",
            }),
            "dd-MMMM-yyyy"
        ) +
        " / " +
        formatDistance(new Date(), formattedDate) +
        " ago "
    );
}

export function formatMySqlTimestampTime(timestampString) {
    let formattedDate = new Date(timestampString);
    return formatDistance(new Date(), formattedDate) + " ago ";
}
export function getDayName(dateString) {
    const date = new Date(dateString); // Create a date object
    const dayOfWeek = date.getDay(); // Get the day of the week (0-6)

    // Convert the number to a human-readable day name
    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const dayName = weekdays[dayOfWeek];

    return dayName;
}

export function getMonthNameFromNumber(monthNumber) {
    // Convert the number to a human-readable day name
    console.log("month number passed as  : " + monthNumber);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const monthName = months[monthNumber - 1];

    return monthName;
}
