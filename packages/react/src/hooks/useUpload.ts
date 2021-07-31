import { useCallback, useState } from 'react';

const useUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const upload = useCallback(() => {
    const promise = new Promise<File | null>((resolve, reject) => {
      const input = document.createElement('input');
      const timeout = setTimeout(reject, 1000 * 60 * 3);
      input.type = 'file';
      input.onchange = () => {
        clearTimeout(timeout);
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
    setLoading(true);
  }, []);

  return { file, upload, loading, reset };
};

export default useUpload;
