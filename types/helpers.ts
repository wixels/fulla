export type PropsOf<E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>
