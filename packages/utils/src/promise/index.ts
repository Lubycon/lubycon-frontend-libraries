type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;
type PromiseRejecter = (reason?: any) => void;

export interface Defer<T> {
  promise: Promise<T>;
  resolve: PromiseResolver<T>;
  reject: PromiseRejecter;
}

export function defer<T>(): Defer<T> {
  let resolver: PromiseResolver<T> | null = null;
  let rejecter: PromiseRejecter | null = null;

  const promise = new Promise<T>((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });

  return {
    promise,
    resolve: resolver!,
    reject: rejecter!,
  };
}
