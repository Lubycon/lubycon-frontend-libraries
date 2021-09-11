import { useCallback, useState } from 'react';
/**
 * 매개변수로 주어진 string을 clipboard copy하는 함수를 반환하는 hook입니다.
 * https환경에서만 사용 가능하며, IE는 지원하지 않습니다.
 *
 * @param onCopyCallback 매개변수로 주어진 string 복사 후 실행할 callback 함수
 * @returns 매개변수로 주어진 string을 복사할 수 있는 함수를 반환합니다.
 * @category hooks
 * @example
  ```javascript
    const Foo = () => {
    const [copiedText, copyString ] = useClipboardCopy();
    
    return (
     <button onClick={() => copyString('https://lubycon.io/')}>공유하기<button/>
    );
  };
  ```
 */
const useClipboardCopy = (onCopyCallback?: () => void) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyString = useCallback(
    async (copyString: string) => {
      if (!navigator?.clipboard) return null;
      try {
        await navigator.clipboard.writeText(copyString);
        setCopiedText(copyString);
        onCopyCallback?.();
      } catch (error) {
        throw error;
      }
    },
    [onCopyCallback]
  );

  return [copiedText, copyString];
};

export default useClipboardCopy;
