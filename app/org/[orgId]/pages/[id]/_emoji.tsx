"use client"

import { useEffect } from "react"
import EmojiPicker, { Emoji, EmojiClickData } from "emoji-picker-react"

import { trpc } from "@/lib/trpc/client"
import { useDebouncedState } from "@/hooks/use-debounced-state"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  id: string
  defaultEmoji?: string | undefined | null
}
const Emjoi: React.FC<Props> = ({ id, defaultEmoji }) => {
  const [emoji, setEmoji] = useDebouncedState<string>(
    defaultEmoji ?? "1f60a",
    1000
  )
  const utils = trpc.useContext()
  const updatePage = trpc.page.update.useMutation({
    onMutate: async () => {
      await utils.page.list.cancel()
      await utils.page.single.cancel({
        id,
      })
    },
    onSuccess: () => {},
    onSettled: () => {
      void utils.page.list.cancel()
      void utils.page.single.cancel({
        id,
      })
    },
  })

  useEffect(() => {
    if (emoji === defaultEmoji) return
    updatePage.mutate({
      id,
      data: {
        icon: emoji,
      },
    })
  }, [emoji])
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setEmoji(emojiData.unified)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="aspect-square w-fit rounded-xl p-3 text-4xl hover:bg-accent lg:text-5xl xl:text-6xl">
          {emoji ? <Emoji unified={emoji} size={40} /> : null}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none" style={{ padding: 0 }}>
        <EmojiPicker lazyLoadEmojis onEmojiClick={onClick} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default Emjoi
