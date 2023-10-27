type Props = {
  children: React.ReactNode
  modal: React.ReactNode
}
const PageLayout: React.FC<Props> = ({ children, modal }) => {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
export default PageLayout
