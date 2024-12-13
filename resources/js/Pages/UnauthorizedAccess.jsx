import PlainLayout from "@/Layouts/PlainLayout";
import { Head, Link } from "@inertiajs/react";

export default function UnauthorizedAccess({ previousURL }) {
    return (
        <>
            <Head title="Welcome" />

            <PlainLayout>
                <Link className="btn" href={previousURL}>
                    Go back
                </Link>
            </PlainLayout>
        </>
    );
}
