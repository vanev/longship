export type Observer<A> = (a: A) => void;

export type Observable<A> = (observer: Observer<A>) => void;

export const map = <A, B>(f: (a: A) => B) => (
  oea: Observable<A>,
): Observable<B> => (observer: Observer<B>) => oea((a) => observer(f(a)));

export const filter = <A>(predicate: (a: A) => boolean) => (
  oea: Observable<A>,
): Observable<A> => (observer: Observer<A>) =>
  oea((a) => {
    if (predicate(a)) observer(a);
  });
