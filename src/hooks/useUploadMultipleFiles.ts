import { useState } from "react";
import { notifyError } from "../utils/notifyError";

export const useUploadMultipleFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFiles(files);
      for (let i = 0; i < files.length; i++) {
        console.log(files);
        setPreviews((prev) => [...prev, URL.createObjectURL(files[i])]);
      }
    }
  };

  const resetFiles = () => {
    setFiles([]);
    setPreviews([]);
  };

  return { resetFiles, handleFileChange, previews, files, setPreviews };
};
