"use client"

import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react"
import { usePathname } from "next/navigation"

type NavState = {
  blur: boolean
  background: boolean
  hidden: boolean
}

type NavAction = {
  type: "field"
  payload: boolean
  field: keyof NavState
}

type NavContextType = {
  state: NavState
  dispatch: Dispatch<NavAction>
}

const NavContext = createContext<NavContextType | undefined>(undefined)

type Props = {
  children?: React.ReactNode
}

function navReducer(state: NavState, action: NavAction): NavState {
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

const NavProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(navReducer, {
    blur: false,
    background: false,
    hidden: false,
  })
  const path = usePathname()

  useEffect(() => {
    if (path !== "/" && path !== "/login") {
      dispatch({ type: "field", payload: false, field: "blur" })
      dispatch({ type: "field", payload: true, field: "background" })
    }
  }, [path])

  const value: NavContextType = { state, dispatch }
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}

const useNav = (): NavContextType => {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error("useNav must be used within a NavProvider")
  }

  return context
}

export { NavProvider, useNav }
