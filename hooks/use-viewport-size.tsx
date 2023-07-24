// @ts-nocheck

import { useCallback, useEffect, useState } from "react"

export function useWindowEvent<K extends string = keyof WindowEventMap>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    window.addEventListener(type, listener, options)
    return () => window.removeEventListener(type, listener, options)
  }, [type, listener])
}

const eventListerOptions = {
  passive: true,
}

export function useViewportSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  const setSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth || 0,
      height: window.innerHeight || 0,
    })
  }, [])

  useWindowEvent("resize", setSize, eventListerOptions)
  useWindowEvent("orientationchange", setSize, eventListerOptions)
  useEffect(setSize, [])

  return windowSize
}
