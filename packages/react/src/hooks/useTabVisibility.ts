import { useEffect } from 'react';

/**
 *
 * page visibility API를 사용하여 사용자가 웹사이트에서 활성 상태인지 비활성 상태인지 확인합니다.
 *
 * @param {Function} onTabVisible 탭이 활성화되었을 때 호출될 함수
 * @param {Function} onTabHidden 탭이 비활성화되었을 때 호출될 함수
 *
 * @example
 * ```javascript
 * const isTabVisible = useTabVisibility(callRepeatApi, pauseRepeatApi);
 * ```
 *
 */

function useTabVisibility(onVisible: () => void, onHidden: () => void) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        onVisible();
      } else {
        onHidden();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}

export default useTabVisibility;
