import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/Admin/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Dashboard({ routesList, savedRoutesList }) {
    const baseURL = import.meta.env.VITE_APP_URL;

    // console.log("route list ");
    // console.log(routesList);

    // console.log("saved routes list");
    // console.log(savedRoutesList);

    const accessControlInfo = routesList.map((route, index) => {
        // console.log("Current route saved info : " + route.uri);
        let previouslySavedRouteInfo = getSavedRouteInfo(route.uri);
        // console.log(previouslySavedRouteInfo);

        if (previouslySavedRouteInfo) {
            return {
                uri: previouslySavedRouteInfo.uri,
                methods: previouslySavedRouteInfo.methods,
                adminCanAccess:
                    previouslySavedRouteInfo.adminCanAccess === 1
                        ? true
                        : false,
                teacherCanAccess:
                    previouslySavedRouteInfo.teacherCanAccess === 1
                        ? true
                        : false,
                studentCanAccess:
                    previouslySavedRouteInfo.studentCanAccess === 1
                        ? true
                        : false,
            };
        } else {
            return {
                uri: route.uri,
                methods: JSON.stringify(route.methods),
                adminCanAccess: false,
                teacherCanAccess: false,
                studentCanAccess: false,
            };
        }
    });

    function getSavedRouteInfo(uri) {
        let savedRouteInfo = undefined;
        for (let i = 0; i < savedRoutesList.length; i++) {
            if (savedRoutesList[i].uri === uri) {
                savedRouteInfo = savedRoutesList[i];
                break;
            }
        }

        return savedRouteInfo;
    }

    const [accessControlRoutes, setAccessControlRoutes] =
        useState(accessControlInfo);

    // useEffect(() => {}, [accessControlRoutes]);

    // console.log("accessControlRoutes are : ");
    // console.log(accessControlRoutes);

    function updateRoutesInfo(alteredRouteInfo) {
        console.log("Altered Route Info");
        console.log(alteredRouteInfo);

        let newAccessControlInfo = accessControlRoutes.map((routeInfo) => {
            console.log("RouteInfo is : ");
            console.log(routeInfo);

            if (
                routeInfo.uri === alteredRouteInfo.uri &&
                routeInfo.methods === alteredRouteInfo.methods
            ) {
                console.log("updated route info for : " + routeInfo.uri);

                switch (alteredRouteInfo.alterAccessFor) {
                    case "admin":
                        return {
                            uri: routeInfo.uri,
                            methods: routeInfo.methods,
                            adminCanAccess: !routeInfo.adminCanAccess,
                            teacherCanAccess: routeInfo.teacherCanAccess,
                            studentCanAccess: routeInfo.studentCanAccess,
                        };
                    case "teacher":
                        return {
                            uri: routeInfo.uri,
                            methods: routeInfo.methods,
                            adminCanAccess: routeInfo.adminCanAccess,
                            teacherCanAccess: !routeInfo.teacherCanAccess,
                            studentCanAccess: routeInfo.studentCanAccess,
                        };
                    case "student":
                        return {
                            uri: routeInfo.uri,
                            methods: routeInfo.methods,
                            adminCanAccess: routeInfo.adminCanAccess,
                            teacherCanAccess: routeInfo.teacherCanAccess,
                            studentCanAccess: !routeInfo.studentCanAccess,
                        };
                    case "default":
                        return routeInfo;
                }
            } else {
                return routeInfo;
            }
        });

        console.log("newAccessControlInfo");

        console.log(newAccessControlInfo);

        setAccessControlRoutes(newAccessControlInfo);
    }

    // console.log(accessControlRoutes);

    const routesListHTML = accessControlRoutes.map((route, index) => {
        // console.log("Route inside accessControlroutes map function ");
        // console.log(route);

        // console.log("route is : ");
        // console.log(route);

        const routeMethodsArray = JSON.parse(route.methods);
        const routeMethodsIconsHTML = routeMethodsArray.map(
            (methodName, index) => {
                return (
                    <button
                        key={index + "-method"}
                        className={methodName + "-method btn btn-primary"}
                    >
                        {methodName}
                    </button>
                );
            }
        );
        return (
            <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                    {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                    {route.uri}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                    {routeMethodsIconsHTML}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                    <input
                        className="size-5 rounded border-gray-300"
                        type="checkbox"
                        checked={route.adminCanAccess}
                        onChange={() =>
                            updateRoutesInfo({
                                uri: route.uri,
                                methods: route.methods,
                                alterAccessFor: "admin",
                            })
                        }
                    />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <input
                        className="size-5 rounded border-gray-300"
                        type="checkbox"
                        checked={route.teacherCanAccess}
                        onChange={() =>
                            updateRoutesInfo({
                                uri: route.uri,
                                methods: route.methods,
                                alterAccessFor: "teacher",
                            })
                        }
                    />
                </td>
                <td className="whitespace-nowrap px-4 py-2 ">
                    <input
                        className="size-5 rounded border-gray-300"
                        type="checkbox"
                        checked={route.studentCanAccess}
                        onChange={() =>
                            updateRoutesInfo({
                                uri: route.uri,
                                methods: route.methods,
                                alterAccessFor: "student",
                            })
                        }
                    />
                </td>
            </tr>
        );

        // console.log(route.uri);
    });

    function saveAcessControlInfo() {
        // console.log("Saving details");
        // console.log(accessControlRoutes);

        // router.post(
        //     baseURL + "/admin/save-access-control-routes",
        //     accessControlRoutes,
        //     {
        //         forceFormData: false,
        //     }
        // );
        const toastId = toast.loading("saving...");
        axios
            .post(
                baseURL + "/admin/save-access-control-routes",
                accessControlRoutes
            )
            .then(function (response) {
                console.log("Response from server");
                console.log(response);

                toast.update(toastId, {
                    render: "Saved Successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                });
            })
            .catch(function (error) {
                console.log("error from server");
                console.log(error);
            });
    }

    return (
        <AuthenticatedLayout header={<h2>Access Control</h2>}>
            <Head title="Dashboard" />

            <div className="overflow-hidden bg-white dark:bg-gray-900 shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <div className="font-bold mb-8">
                        Check the checkbox for the user who can Access the route
                    </div>

                    <div className="table w-full">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-400">
                                <thead className="text-left">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium ">
                                            #
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium ">
                                            URI
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium ">
                                            Methods
                                        </th>

                                        <th className="whitespace-nowrap px-4 py-2 font-medium ">
                                            Admin
                                        </th>

                                        <th className="whitespace-nowrap px-4 py-2 font-medium ">
                                            Teacher
                                        </th>

                                        <th className="whitespace-nowrap px-4 py-2 font-medium ">
                                            Student
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {routesListHTML}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-end py-5">
                        <PrimaryButton onClick={() => saveAcessControlInfo()}>
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
