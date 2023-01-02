import { useState } from "react";

export const useUploadImage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const resetFiles = () => {
    setFile(null);
  };

  return { resetFiles, handleFileChange, file };
};
