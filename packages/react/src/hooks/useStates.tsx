import { useState } from 'react';

/**
 * useStates hook
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

function useStates<State extends Record<string, unknown>>(initialState: State) {
  const [values, setValues] = useState(initialState);
  const update = <Key extends keyof State>(name: Key, value: State[Key]) =>
    setValues((form) => ({ ...form, [name]: value }));

  return [values, update] as const;
}

export default useStates;
