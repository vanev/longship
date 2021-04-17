export const pipe = <A, B, C>(f: (a: A) => B, g: (b: B) => C) => (a: A): C =>
  g(f(a));

export const pipe3 = <A, B, C, D>(
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
) => (a: A): D => h(g(f(a)));

export const pipe4 = <A, B, C, D, E>(
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
) => (a: A): E => i(h(g(f(a))));

export const pipe5 = <A, B, C, D, E, F>(
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
  i: (d: D) => E,
  j: (e: E) => F,
) => (a: A): F => j(i(h(g(f(a)))));
