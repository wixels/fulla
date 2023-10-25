"use client"

import { useEffect, useState } from "react"
import { useRoom } from "@/liveblocks.config"
import LiveblocksProvider from "@liveblocks/yjs"
import Collaboration from "@tiptap/extension-collaboration"
import CollaborationCursor from "@tiptap/extension-collaboration-cursor"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import * as Y from "yjs"

import { Editor } from "@/components/editor"

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom()
  const [doc, setDoc] = useState<Y.Doc>()
  const [provider, setProvider] = useState<any>()

  // Set up Liveblocks Yjs provider
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
  return (
    <div>
      {/* <div className={styles.editorHeader}>
        <Toolbar editor={editor} />
        <Avatars />
      </div> */}
      <Editor
        disableLocalStorage
        extensions={[
          Collaboration.configure({
            document: doc,
          }),
          // Attach provider and user info
          CollaborationCursor.configure({
            provider: provider,
          }),
        ]}
      />
      {/* <EditorContent editor={editor} className={styles.editorContainer} /> */}
    </div>
  )
}
