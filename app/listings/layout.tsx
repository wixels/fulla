import React from 'react'

type Props = {
  children?: React.ReactNode
}

export default async function ListingsLayout({ children }: Props) {
  return <div className="min-h-screen">{children}</div>
}
