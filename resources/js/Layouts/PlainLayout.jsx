export default function PlainLayout({ children }) {
    return (
        <>
            <div className="min-h-screen  pt-6 sm:justify-center sm:pt-0">
                <div className=" flex items-center justify-center w-full min-h-[80vh] overflow-hidden bg-white px-6 py-4">
                    {children}
                </div>
            </div>
        </>
    );
}
