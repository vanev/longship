const always = <A>(a: A) => (_?: unknown): A => a;

export default always;
