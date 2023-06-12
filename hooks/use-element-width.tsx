import { useEffect, useState } from "react"

const useElementWidth = (ref: React.RefObject<HTMLElement>): number => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth)
      }
    }

    if (ref.current) {
      setWidth(ref.current.offsetWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [ref])

  return width
}

export default useElementWidth
