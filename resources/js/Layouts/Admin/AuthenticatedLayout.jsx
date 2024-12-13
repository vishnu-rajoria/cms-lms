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

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <Theme>
            <div className="min-h-screen dark:bg-slate-800">
                <ToastContainer />
                <nav className="border-b border-gray-100 bg-white dark:invert">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="flex shrink-0 items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 md:flex hidden">
                                    <NavLink
                                        href={route("admin.dashboard")}
                                        active={route().current(
                                            "admin.dashboard"
                                        )}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route("manage.students")}
                                        active={
                                            route().current(
                                                "manage.students"
                                            ) ||
                                            route().current(
                                                "admin.register.student"
                                            )
                                                ? true
                                                : false
                                        }
                                    >
                                        Manage Students
                                    </NavLink>
                                </div>
                            </div>

                            <div className="ms-6 flex items-center">
                                <Breather />
                                <ThemeSwitcher />

                                <div className="relative ms-3 ">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
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

                                        <Dropdown.Content className="z-99">
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>

                                            <Dropdown.Link
                                                href={route(
                                                    "admin.access_control"
                                                )}
                                            >
                                                Access Control
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route("test")}>
                                                Test
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

                <nav className="border-b border-gray-100 bg-white dark:invert justify-center flex lg:hidden overflow-auto z-50">
                    <div className="max-w-7xl flex flex-norwrap items-center justify-start px-4 py-4 gap-4">
                        <NavLink
                            href={route("admin.dashboard")}
                            active={route().current("admin.dashboard")}
                            className="shrink-0"
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            href={route("manage.students")}
                            active={
                                route().current("manage.students") ||
                                route().current("admin.register.student")
                                    ? true
                                    : false
                            }
                            className="shrink-0"
                        >
                            Manage Students
                        </NavLink>
                        <NavLink
                            href={route("manage.students")}
                            active={
                                route().current("manage.students") ||
                                route().current("admin.register.student")
                                    ? true
                                    : false
                            }
                            className="shrink-0"
                        >
                            Manage Students
                        </NavLink>
                        <NavLink
                            href={route("manage.students")}
                            active={
                                route().current("manage.students") ||
                                route().current("admin.register.student")
                                    ? true
                                    : false
                            }
                            className="shrink-0"
                        >
                            Manage Students
                        </NavLink>
                        <NavLink
                            href={route("manage.students")}
                            active={
                                route().current("manage.students") ||
                                route().current("admin.register.student")
                                    ? true
                                    : false
                            }
                            className="shrink-0"
                        >
                            Manage Students
                        </NavLink>
                        <NavLink
                            href={route("manage.students")}
                            active={
                                route().current("manage.students") ||
                                route().current("admin.register.student")
                                    ? true
                                    : false
                            }
                            className="shrink-0"
                        >
                            Manage Students
                        </NavLink>
                    </div>
                </nav>
                {header && (
                    <header className="bg-white shadow dark:bg-gray-900">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-xl font-semibold leading-tight text-gray-800 dark:text-gray-400">
                            {header}
                        </div>
                    </header>
                )}
                <main>
                    <div className="py-8">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            <div></div>
        </Theme>
    );
}
