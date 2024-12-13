import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
// This function returns a JSX component that will be rendered in the browser.
// The component is a simple page with a heading and some text.
// The text is dynamic and is determined by the props passed to the component.
//
// The props are:
// - auth: an object containing information about the currently logged in user.
// - canRegister: a boolean indicating whether the user is allowed to register.
// - canLogin: a boolean indicating whether the user is allowed to log in.
// - author_name: the name of the author of the Laravel package.
// - laravelVersion: the version of Laravel installed.
// - phpVersion: the version of PHP installed.
//
export default function Welcome({
    auth,
    canRegister,
    canLogin,
    author_name,
    laravelVersion,
    phpVersion,
}) {
    // The content of the page is wrapped in a GuestLayout component, which is a
    // predefined component that provides a basic layout for guest pages.
    return (
        <>
            <Head title="Welcome" />
            <GuestLayout>
                {/* The content of the page goes here */}
                <p>This is our welcome page.</p>
            </GuestLayout>
        </>
    );
}
