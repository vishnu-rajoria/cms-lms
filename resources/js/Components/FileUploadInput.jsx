import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

// Styles for the thumbnails container
const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
};

// Styles for individual thumbnail
const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid rgba(150,150,150,0.2)",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
};

// Styles for the inner part of the thumbnail
const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
};

// Styles for the image within the thumbnail
const img = {
    display: "block",
    width: "auto",
    objectFit: "contain",
};

export default function FileUploadInput(props) {
    // State to store the files
    const [files, setFiles] = useState(props.value);

    // Dropzone configuration
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [], // Accept all image types
        },
        maxFiles: props.maxNumberOfFiles,
        onDrop: (acceptedFiles) => {
            // Process and preview the accepted files
            setFiles(acceptedFiles);
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
        },
    });

    // Generate thumbnails for each file
    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data URI after image is loaded to prevent memory leaks
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    // Clean up previews on component unmount

    useEffect(() => {
        // console.log("Files  are");
        // console.log(files);

        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            {/* Dropzone area */}

            <div {...getRootProps({ className: "dropzone" })}>
                <input name={props.name} {...getInputProps()} />
                <p className="dark:text-gray-400 text-gray-500 cursor-pointer border-2 border-dashed border-slate-700 rounded-md p-4">
                    Drag 'n' drop some files here, or click to select files
                </p>
            </div>
            {/* Display thumbnails */}
            <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
    );
}
