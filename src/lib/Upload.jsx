// firebaseUpload.js
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { toast } from "react-toastify";
import { useData } from "../context/PropContext";

const storage = getStorage();

const Upload = async (file) => {
  if (!file) {
    toast.error("No file selected for upload.");
    return;
  }
  const date = new Date();

  // Create a storage reference from our storage service
  const storageRef = ref(storage, `images/${date + file.name}`);

  // Start the file upload
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.success("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Upload failed:", error);
        toast.error(`Upload failed: ${error.message}`);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
            toast.success("Upload successful!");
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            toast.error(`Error retrieving download URL: ${error.message}`);
            reject(error);
          });
      }
    );
  });
};

export default Upload;
