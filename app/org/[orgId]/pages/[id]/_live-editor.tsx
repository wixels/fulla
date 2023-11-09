"use client"

import { useEffect, useState } from "react"
import { useOthers, useRoom, useSelf } from "@/liveblocks.config"
import LiveblocksProvider from "@liveblocks/yjs"
import Collaboration from "@tiptap/extension-collaboration"
import CollaborationCursor from "@tiptap/extension-collaboration-cursor"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { MessageCircle } from "lucide-react"
import * as Y from "yjs"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Editor } from "@/components/editor"

export function CollaborativeEditor() {
  const room = useRoom()
  const [doc, setDoc] = useState<Y.Doc>()
  const [provider, setProvider] = useState<any>()

  useEffect(() => {
    const yDoc = new Y.Doc()
    const yProvider = new LiveblocksProvider(room, yDoc)
    setDoc(yDoc)
    setProvider(yProvider)

    return () => {
      yDoc?.destroy()
      yProvider?.destroy()
    }
  }, [room])

  if (!doc || !provider) {
    return null
  }

  return <TiptapEditor doc={doc} provider={provider} />
}

type EditorProps = {
  doc: Y.Doc
  provider: any
}

function TiptapEditor({ doc, provider }: EditorProps) {
  const users = useOthers()
  const currentUser = useSelf()
  const hasMoreUsers = users.length - 1 > 3
  return (
    <div className="relative">
      {/* <div className="fixed inset-x-0 bottom-6 z-10 mx-auto flex h-11 w-fit items-center gap-2 rounded-full bg-foreground/30 p-[6px] backdrop-blur">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="text-background hover:bg-background/10 hover:text-background"
                size="xs"
                rounded={"full"}
                variant={"ghost"}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Comment</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="h-3/4" />
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="border-2 border-red-700" size={"sm"}>
                <AvatarFallback>{currentUser?.info?.name}</AvatarFallback>
                <AvatarImage src={currentUser.info?.image as string} />
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{currentUser?.info?.name}</TooltipContent>
          </Tooltip>

          {users.map(({ connectionId, info }) => {
            return (
              <Tooltip>
                <TooltipTrigger>
                  <Avatar key={connectionId} size={"sm"}>
                    <AvatarFallback>{info?.name}</AvatarFallback>
                    <AvatarImage src={info?.image as string} />
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{info?.name}</TooltipContent>
              </Tooltip>
            )
          })}
          {hasMoreUsers && (
            <Avatar size={"sm"}>
              <AvatarFallback>+{users.length - 4}</AvatarFallback>
            </Avatar>
          )}
        </TooltipProvider>
      </div> */}
      <Editor
        defaultValue={doc}
        disableLocalStorage
        extensions={
          [
            // Collaboration.configure({
            //   document: doc,
            // }),
            // // Attach provider and user info
            // CollaborationCursor.configure({
            //   provider: provider,
            // }),
          ]
        }
      />
      {/* <EditorContent editor={editor} className={styles.editorContainer} /> */}
    </div>
  )
}
