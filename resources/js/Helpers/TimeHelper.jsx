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
    console.log(formattedDate) + "";
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
