type isUnion<T, U = T> = T extends T ? ([U] extends [T] ? false : true) : never;

type isNever<T> = [T] extends [never] ? true : false;

type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? false
  : false;

type isTuple<T> = T extends [...params: infer Eles] ? NotEqual<Eles["length"], number> : false;

type isTupleResult = isTuple<1>;
