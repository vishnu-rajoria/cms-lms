import GuestNav from "@/Components/GuestNav";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <>
            <div className="min-h-screen sm:justify-center sm:pt-0">
                <GuestNav />

                <div className=" flex items-center justify-center w-full min-h-[80vh] overflow-hidden bg-white px-6 py-4">
                    {children}
                </div>
            </div>
        </>
    );
}
