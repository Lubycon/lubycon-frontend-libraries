import { useState } from 'react';

/**
 * useMutateStates hook
 * 여러개의 상태를 동시에 업데이트 할 수 있는 훅입니다.
 * **주의**: 이 훅은 하나의 프로퍼티만 변경 되어도 모든 프로퍼티의 레퍼런스를 변경합니다.
 *
 * @param initialState
 * @returns [state, setState]
 *
 * @example
 * ```ts
 * function Foo() {
 *   const contact = {
 *     name: 'gildong',
 *     number: '010-1234-5678',
 *   };
 *
 *   const [values, update] = useStates(contact);
 *
 *   return (
 *     <div>
 *       <button onClick={() => update('name', '')}> Clear name</button>
 *       <p>name: {values.name}</p>
 *       <button onClick={() => update('number', '')}> Clear number</button>
 *       <p>name: {values.number}</p>
 *     </div>
 *   );
 * }
 * ```
 */

function useMutateStates<State extends Record<string, { [key: string]: any }>>(
  initialState: State
) {
  const [values, setValues] = useState(initialState);
  const update = <Key extends keyof State>(name: Key, value: State[Key]) =>
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

  return [values, update] as const;
}

export default useMutateStates;
