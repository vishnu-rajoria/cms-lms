import AuthenticatedLayout from "@/Layouts/Student/AuthenticatedLayout";
export default function DisplayResourceMaterial({ type }) {
    return (
        <AuthenticatedLayout>
            Display Resource material for {type}
        </AuthenticatedLayout>
    );
}
