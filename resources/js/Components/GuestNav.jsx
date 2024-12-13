import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestNav({}) {
    const appBaseURL = import.meta.env.VITE_APP_URL;
    return (
        <div className="navbar flex p-3 bg-gray-100 items-center shadow-lg gap-3">
            {}
            <Link href={appBaseURL}>
                <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
            </Link>
            <Link className="ml-auto" href={appBaseURL + "/about-us"}>
                About us
            </Link>
            <Link className="" href={appBaseURL + "/login"}>
                Login
            </Link>
        </div>
    );
}
