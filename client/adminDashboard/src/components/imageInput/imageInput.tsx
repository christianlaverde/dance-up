import React from "react";
import { getStorage, ref } from "firebase/storage";
import { TextField } from "@mui/material";


export default function ImageInput() {
    // Create a root reference
const storage = getStorage();

const handleFileUpload = async (e) => {
  e.preventDefault();
  console.log(e.target);
  const fileInput = e.target.elements.namedItem("file") as HTMLInputElement;
  console.log(fileInput);
  if (fileInput?.files?.[0]) {
    const file = fileInput.files[0];
    console.log(file);
    // Create a storage reference
    const storageRef = ref(storage, `uploads/${file.name}`);
    console.log(storageRef);
    try {
      const uploadTask = await import("firebase/storage").then(
        ({ uploadBytes }) => uploadBytes(storageRef, file)
      );
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  }
};


    return (
        <>
            <TextField 
                type="file" 
                name="studio image" 
                label="Bio"
                onChange={handleFileUpload}
                />
            <button type="submit" onClick={handleFileUpload}>Upload</button>
        </>
    );
}