import { Room } from "@/components/liveblocks/room"

import { CollaborativeEditor } from "./_live-editor"

type Props = {
  params: {
    id: string
  }
}
const Page: React.FC<Props> = ({ params: { id } }) => {
  return (
    <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
      <Room roomId={id}>
        <CollaborativeEditor />
      </Room>
    </div>
  )
}
export default Page
