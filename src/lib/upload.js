import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
        console.error('File type not supported. Please upload a JPG, JPEG, or PNG image.');
        return;
    }

    // Set metadata with dynamic contentType
    const metadata = {
        contentType: file.type
    };

    const date = Date.now();

    // Reference to where the file will be stored in Firebase
    const storageRef = ref(storage, 'images/' + date + '_' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject) => {
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Track upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Reject with error code if something goes wrong
                reject(`Something went wrong! Error code: ${error.code}`);
                // Handle specific error cases
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.error('User does not have permission to access the object');
                        break;
                    case 'storage/canceled':
                        console.error('User canceled the upload');
                        break;
                    case 'storage/unknown':
                        console.error('Unknown error occurred:', error.serverResponse);
                        break;
                }
            },
            () => {
                // Upload completed successfully; get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

export default upload;
