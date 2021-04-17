export const map = <A, B>(f: (a: A) => B) => (pa: Promise<A>): Promise<B> =>
  pa.then(f);

export const chain = <A, B>(f: (a: A) => Promise<B>) => (
  pa: Promise<A>,
): Promise<B> => pa.then(f);
