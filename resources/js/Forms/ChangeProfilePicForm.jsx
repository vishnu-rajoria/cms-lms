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
                profilePicChangeResponseHandler(response);
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
                            containerClassName: "bg-black my-2 rounded-lg",
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
    );
}
