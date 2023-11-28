"use client"

import React, { Dispatch, createContext, useContext, useReducer } from "react"

type FooterState = {
  hidden: boolean
}

type FooterAction = {
  type: "field"
  payload: boolean
  field: keyof FooterState
}

type FooterContextType = {
  state: FooterState
  dispatch: Dispatch<FooterAction>
}

const NavContext = createContext<FooterContextType | undefined>(undefined)

type Props = {
  children?: React.ReactNode
}

function footerReducer(state: FooterState, action: FooterAction): FooterState {
  const { type, payload, field } = action
  switch (type) {
    case "field": {
      return {
        ...state,
        [field]: payload,
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

const FooterProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(footerReducer, {
    hidden: false,
  })

  const value: FooterContextType = { state, dispatch }
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}

const useFooter = (): FooterContextType => {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider")
  }

  return context
}

export { FooterProvider, useFooter }
