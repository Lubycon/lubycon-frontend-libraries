import { useState } from 'react';

const useStates = <State extends Record<string, unknown>>(initialState: State) => {
  const [values, setValues] = useState(initialState);
  const update = <Key extends keyof State>(name: Key, value: State[Key]) =>
    setValues((form) => ({ ...form, [name]: value }));

  return [values, update] as const;
};

export default useStates;
