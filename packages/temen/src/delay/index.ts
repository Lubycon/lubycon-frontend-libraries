const delay = (miliseconds: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
};

export default delay;
