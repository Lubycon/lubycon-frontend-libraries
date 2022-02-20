import React, { ComponentType, ReactNode } from 'react';
import { ComponentProps, Suspense, useEffect, useState } from 'react';

/**
 * SSR 환경에서는 fallback를 렌더하고, CSR 환경에서는 Suspsense를 렌더하는 컴포넌트입니다.
 *
 * @example
 * ```jsx
 * <SSRSuspense fallback={<Fallback />}>
 *   <MyPage />
 * </SSRSuspense>
 * ```
 */
export function SSRSuspense({ fallback, children }: ComponentProps<typeof Suspense>) {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isMounted) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }
  return <>{fallback}</>;
}

/**
 * SSRSuspense를 HoC로 사용할 수 있는 함수입니다
 *
 * @example
 * ```ts
 * export default withSSRSuspense(<MyPage />, { fallback: <Fallback /> });
 * ```
 */
export function withSSRSuspense<T>(
  WrappedComponent: ComponentType<T>,
  options: { fallback: NonNullable<ReactNode> | null }
) {
  return (props: T) => {
    return (
      <SSRSuspense fallback={options.fallback}>
        <WrappedComponent {...(props as any)} />
      </SSRSuspense>
    );
  };
}
