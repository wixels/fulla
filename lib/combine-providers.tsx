export type ProviderConfig = {
  Provider: React.JSXElementConstructor<React.PropsWithChildren<unknown>>
  props?: Record<string, any>
}

type Props = {
  children: React.ReactNode
  providers: ProviderConfig[]
}

export const combineProviders: React.FC<Props> = ({ children, providers }) => {
  return providers.reduceRight(
    (acc, { Provider, props }) => <Provider {...props}>{acc}</Provider>,
    children
  )
}
