import { DependencyList, useEffect } from 'react';

/**
 * useEffect로 async function을 넘기면 타입이 깨지기 때문에 사용하는 헬퍼입니다.
 *
 * 동작은 useEffect와 똑같지만, 이펙트가 반환하는 타입이 Promise<void>이기 때문에 클린업은 불가능합니다.
 *
 * @example
 * ```ts
 * useAsyncEffect(async () => {
 *   const response = await fetchUsers();
 *   setUsers(response);
 * }, []);
 * ```
 */
export default function useAsyncEffect(asyncEffect: () => Promise<void>, deps: DependencyList) {
  useEffect(() => {
    asyncEffect();
  }, deps);
}
