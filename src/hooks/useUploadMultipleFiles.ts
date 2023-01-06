import { useState } from 'react';
import { v4 } from 'uuid';
import { notifyError } from '../utils/toast.helpers';

export type FileWithId = File & { id: string };

export const useUploadMultipleFiles = () => {
  const [files, setFiles] = useState<FileWithId[]>([]);

  const handleFiles = (filesArr: File[]) => {
    for (let i = 0; i < filesArr.length; i++) {
      if (i > 4) {
        notifyError(`You cant upload more than 5 files`);
        break;
      }
      const fl = filesArr[i];
      if (fl.size > 15 * 1024 * 1024) {
        notifyError(`File ${fl.name} is too big`);
        continue;
      }
      setFiles((prev) => [...prev, Object.assign(fl, { id: v4() })]);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const resetFiles = () => {
    setFiles([]);
  };

  return { handleFiles, resetFiles, files, setFiles, handleRemoveFile };
};
