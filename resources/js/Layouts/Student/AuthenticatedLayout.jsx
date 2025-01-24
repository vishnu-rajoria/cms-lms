import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import Theme from "@/Theme/Theme";
import Breather from "@/Components/Breather";
import Notification from "@/Components/Notification";
import ChangeEmailForm from "@/Forms/ChangeEmailForm";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isEmailVerified, setIsEmailVerified] = useState(
        user.email_verified_at ? true : false
    );
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    function emailChangeResponseHandler(response) {
        console.log("Email change verification :");
        console.log(response);
        if (response.data.status == "success") {
            setIsEmailVerified(true);
        }
    }
    return (
        <Theme>
            <div className="min-h-screen bg-slate-200 dark:bg-slate-700">
                <ToastContainer />
                <nav className="border-gray-100 bg-slate-200 dark:bg-slate-800 z-[100]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between  ">
                            <div className="flex">
                                <div className="flex shrink-0 items-center dark:invert dark:opacity-90">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>
                            </div>

                            <div className="ms-6 flex items-center">
                                <Breather />
                                <Notification userId={user.id} />
                                <ThemeSwitcher />
                                <div className="relative ms-3 ">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-black px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>

                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <nav className=" border-gray-100 bg-gradient-to-t from-slate-200 to-slate-300  shadow-lg  dark:bg-gradient-to-t dark:from-slate-900 dark:to-slate-900 justify-start md:justify-center flex overflow-auto z-10 px-6 ">
                    <div className="p-2 flex flex-norwrap items-center justify-start gap-2 ">
                        <NavLink
                            href={route("student.dashboard")}
                            active={route().current("admin.dashboard")}
                            className="shrink-0"
                        >
                            Dashboard
                        </NavLink>
                        {/* <NavLink
                            href={route("student.resource.material")}
                            active={route().current(
                                "student.resource.material"
                            )}
                            className="shrink-0"
                        >
                            Resource Material
                        </NavLink> */}
                    </div>
                </nav>
                {header && (
                    <header className=" dark:bg-slate-700 ">
                        <div className="mx-auto  max-w-7xl  px-8 py-2 text-xl font-semibold leading-tight text-green-400">
                            {header}
                        </div>
                    </header>
                )}
                <main>
                    <div className="">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            {/* {JSON.stringify(user)} */}
                            {isEmailVerified && <>{children}</>}
                            {!isEmailVerified && (
                                <>
                                    <h3 className="text-center text-gray-300">
                                        Your email is not verified. please
                                        verify if before proceeding
                                    </h3>
                                    <ChangeEmailForm
                                        userId={user.id}
                                        userRoleId={user.role_id}
                                        emailChangeResponseHandler={
                                            emailChangeResponseHandler
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            <div></div>
        </Theme>
    );
}
