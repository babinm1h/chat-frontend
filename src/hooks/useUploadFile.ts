import { useState } from "react";

export const useUploadImage = () => {
  const [img, setImg] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
    };
  };

  const resetFiles = () => {
    setImg(null);
    setPreview(null);
  };

  return { resetFiles, handleFileChange, preview, img };
};
