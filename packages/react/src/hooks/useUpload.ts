import { useCallback, useState } from 'react';

const useUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const upload = useCallback(() => {
    const promise = new Promise<File | null>((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = () => {
        if (!input.files) return reject();
        const file = input.files[0];
        setFile(file);
        resolve(file);
      };
      input.click();
    });

    return promise;
  }, []);

  const reset = useCallback(() => {
    setFile(null);
  }, []);

  return { file, upload, reset };
};

export default useUpload;
