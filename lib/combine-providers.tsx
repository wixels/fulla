// @ts-nocheck
import React, { ComponentProps, ComponentType, FC } from "react"

type Providers = [ComponentType<any>, ComponentProps<any>?][]

export const combineProviders = (providers: Providers): FC =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      // eslint-disable-next-line react/display-name
      ({ children }) =>
        (
          <AccumulatedProviders>
            <Provider {...props}>
              <>{children}</>
            </Provider>
          </AccumulatedProviders>
        ),
    ({ children }) => <>{children}</>
  )
