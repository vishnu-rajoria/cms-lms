import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/Helpers/CropImage";
import axios from "axios";
import { baseURL } from "@/Env";

export default function ChangeProfilePicForm({
    userId,
    userRoleId,
    profilePicChangeResponseHandler,
    ...props
}) {
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState();
    const [croppedImage, setCroppedImage] = useState(null);
    const [mimeType, setMimeType] = useState("");
    const [src, setSrc] = useState("");
    const onCropComplete = (newCroppedArea, newCroppedAreaPixels) => {
        console.log("On crop complete");
        console.log(newCroppedArea, newCroppedAreaPixels);
        setCroppedAreaPixels(newCroppedAreaPixels);
    };

    const uploadCroppedImg = async () => {
        const newCroppedImageData = await getCroppedImg(
            mimeType,
            src,
            croppedAreaPixels,
            rotation
        );

        console.log("newCroppedImageData");
        console.log(newCroppedImageData);
        setCroppedImage(newCroppedImageData.url);
        console.log("Cropped image : ");
        console.log(newCroppedImageData);

        let formData = new FormData();
        // let imageBlobData = new File([newCroppedImage], "profile_pic.jpg");
        formData.append("profile_pic", newCroppedImageData.blob);
        formData.append("user_id", userId);
        formData.append("user_role_id", userRoleId);

        console.log(formData);
        let updatedProfilePicSubmitFormURL =
            baseURL + "/api/update-profile-pic";
        axios({
            method: "post",
            url: updatedProfilePicSubmitFormURL,
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
        })
            .then(function (response) {
                // Log the response from the server
                console.log("Response from server");
                console.log(response);
                // responseHandler(response);
                // toast.dismiss();

                setMimeType("");

                setIsImageUploaded(true);
                setTimeout(() => {
                    profilePicChangeResponseHandler(response);
                }, 1000);
            })
            .catch(function (error) {
                // Log the error from the server
                console.log("Error from server");
                console.log(error.response.data);

                // if (error.response.data.message) {
                //     toast.update(toastId, {
                //         render: error.response.data.message,
                //         type: "error",
                //         isLoading: false,
                //         closeOnClick: true,
                //         draggable: true,
                //         transition: Zoom,
                //         theme: "colored",
                //         autoClose: 5000,
                //     });
                // }
            });
    };

    function setImageSrc() {
        let form = document.querySelector("#profile-pic-selection-form");
        let formData = new FormData(form);

        // get currently selected image
        let image = formData.get("image");
        console.log(image);
        setMimeType(image.type);
        console.log("mime type is " + image.type);
        setSrc(URL.createObjectURL(image));
    }

    return (
        <div className="h-[100%]">
            {isImageUploaded && (
                <div className="flex justify-center items-center min-h-[70vh] ">
                    <svg
                        className="w-[150px]"
                        viewBox="0 0 48 48"
                        enable-background="new 0 0 48 48"
                        id="_x3C_Layer_x3E_"
                        version="1.1"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g id="tick_x2C__check_mark">
                                {" "}
                                <circle
                                    cx="24"
                                    cy="24"
                                    fill="#E1F5FE"
                                    r="21.5"
                                ></circle>{" "}
                                <path
                                    d="M24,46C11.869,46,2,36.131,2,24S11.869,2,24,2c6.219,0,12.175,2.65,16.342,7.271 c0.186,0.205,0.169,0.521-0.036,0.706c-0.206,0.185-0.522,0.168-0.706-0.036C35.622,5.53,29.937,3,24,3C12.421,3,3,12.42,3,24 s9.421,21,21,21s21-9.42,21-21c0-2.299-0.369-4.56-1.098-6.72c-0.089-0.262,0.052-0.545,0.313-0.633 c0.268-0.088,0.546,0.052,0.634,0.314C45.613,19.224,46,21.592,46,24C46,36.131,36.131,46,24,46z"
                                    fill="#0277BD"
                                ></path>{" "}
                                <path
                                    d="M24,45C12.421,45,3,35.58,3,24S12.421,3,24,3c5.834,0,11.454,2.458,15.419,6.743 c0.188,0.203,0.175,0.519-0.027,0.707c-0.203,0.187-0.52,0.176-0.707-0.028C34.909,6.341,29.557,4,24,4C12.972,4,4,12.972,4,24 s8.972,20,20,20s20-8.972,20-20c0-2.03-0.303-4.031-0.899-5.948c-0.082-0.264,0.065-0.544,0.329-0.626 c0.263-0.08,0.545,0.066,0.626,0.329C44.683,19.768,45,21.869,45,24C45,35.58,35.579,45,24,45z"
                                    fill="#FFFFFF"
                                ></path>{" "}
                                <g>
                                    {" "}
                                    <g>
                                        {" "}
                                        <path
                                            d="M21.584,33.834c0.892,0.888,2.438,0.888,3.331,0l19.387-19.309c0.931-0.926,0.931-2.433,0-3.359 c-0.892-0.888-2.438-0.888-3.33,0L24.007,28.061c-0.399,0.398-1.116,0.398-1.516,0l-6.463-6.436 c-0.446-0.444-1.037-0.688-1.665-0.688s-1.22,0.244-1.665,0.688c-0.931,0.926-0.931,2.433,0,3.359L21.584,33.834z"
                                            fill="#64FFDA"
                                        ></path>{" "}
                                        <path
                                            d="M23.249,35.005c-0.735,0-1.471-0.272-2.018-0.817v0l-8.886-8.85c-0.545-0.542-0.846-1.265-0.846-2.035 c0-0.769,0.301-1.491,0.846-2.033c1.077-1.074,2.954-1.076,4.035,0l6.463,6.436c0.205,0.204,0.606,0.205,0.81,0l16.966-16.896 c1.094-1.089,2.941-1.089,4.035,0c0.545,0.542,0.846,1.265,0.846,2.034c0,0.769-0.301,1.491-0.846,2.033L25.268,34.188 C24.721,34.733,23.984,35.005,23.249,35.005z M14.363,21.437c-0.495,0-0.961,0.193-1.312,0.542 c-0.355,0.354-0.552,0.824-0.552,1.325s0.195,0.972,0.551,1.325l8.886,8.851c0.699,0.695,1.927,0.696,2.626,0L43.949,14.17 c0.354-0.353,0.551-0.824,0.551-1.325s-0.195-0.972-0.551-1.325c-0.699-0.696-1.926-0.697-2.625,0L24.359,28.416 c-0.59,0.59-1.63,0.59-2.222,0l-6.462-6.436C15.324,21.629,14.858,21.437,14.363,21.437z"
                                            fill="#0277BD"
                                        ></path>{" "}
                                    </g>{" "}
                                    <path
                                        d="M13,23.804c-0.276,0-0.5-0.224-0.5-0.5c0-0.5,0.196-0.971,0.552-1.325c0.351-0.35,0.816-0.542,1.312-0.542 c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5c-0.229,0-0.443,0.089-0.606,0.25c-0.165,0.166-0.257,0.385-0.257,0.617 C13.5,23.581,13.276,23.804,13,23.804z"
                                        fill="#FFFFFF"
                                    ></path>{" "}
                                    <path
                                        d="M26.161,27.828c-0.128,0-0.257-0.049-0.354-0.147c-0.194-0.196-0.194-0.512,0.002-0.708l14.07-14.013 c0.195-0.194,0.512-0.195,0.707,0.001c0.194,0.196,0.194,0.512-0.002,0.708l-14.07,14.013 C26.416,27.779,26.289,27.828,26.161,27.828z"
                                        fill="#FFFFFF"
                                    ></path>{" "}
                                </g>{" "}
                            </g>{" "}
                        </g>
                    </svg>
                </div>
            )}
            {!isImageUploaded && (
                <div class="py-6 text-gray-200 grid gap-2">
                    Select an image to upload as a profile pic
                    <form
                        id="profile-pic-selection-form"
                        className="change-profile-pic-form text-white "
                    >
                        <input
                            type="file"
                            name="image"
                            className="py-2 px-2 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id=""
                            onChange={() => setImageSrc()}
                        />
                    </form>
                    {src && (
                        <>
                            <Cropper
                                image={src}
                                crop={crop}
                                zoom={zoom}
                                classes={{
                                    containerClassName:
                                        "bg-black my-2 rounded-lg",
                                }}
                                aspect={1 / 1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                style={{
                                    containerStyle: {
                                        position: "relative",
                                        height: "200px",
                                        width: "100%",
                                        zIndex: 20,
                                    },
                                }}
                            ></Cropper>

                            <button
                                class="btn btn-success z-50 flex justify-center"
                                onClick={uploadCroppedImg}
                            >
                                Crop & Upload
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
