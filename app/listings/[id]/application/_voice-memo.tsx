"use client"

import { useEffect, useState } from "react"
import { useWhisper } from "@chengsokdara/use-whisper"
import { Mic, Square } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import { Textarea } from "@/components/ui/textarea"
import { Title } from "@/components/ui/title"
import Balancer from "@/components/balancer"
import Siriwave from "@/components/siriwave"

type Props = {}
export const VoiceMemo: React.FC<Props> = ({}) => {
  const [text, setText] = useState("")

  const {
    recording,
    speaking,
    transcribing,
    transcript,
    startRecording,
    stopRecording,
  } = useWhisper({
    stopTimeout: 1000 * 2,
    apiKey: "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",
  })

  useEffect(() => {
    if (transcript.text) {
      setText(transcript.text)
      console.log("setText(transcript)::: ", transcript.text)
    }
  }, [transcript])

  return (
    <div>
      <Title showAs={2} style={{ marginTop: 0 }}>
        <Balancer>Tell us about yourself.</Balancer>
      </Title>
      <Paragraph size={"lg"} className="text-muted-foreground font-normal">
        <Balancer>
          Can you briefly describe why you believe you would be an ideal tenant
          for this property and how you plan to maintain and care for it
        </Balancer>
      </Paragraph>

      <div className="bg-muted-foreground/5 rounded-lg flex items-center gap-4 p-4 mt-8">
        <button
          onClick={() => {
            recording ? stopRecording() : startRecording()
          }}
          className="bg-red-500 h-16 w-16 border-spacing-1 border-4 border-white rounded-full relative flex items-center justify-center text-white"
        >
          {recording ? <Square /> : <Mic />}
        </button>
        <div id="wave-panel" className="grow flex items-center h-[120px]">
          <Siriwave
            parentId="wave-panel"
            autostart={recording}
            height={120}
            theme={"ios9"}
          />
        </div>
      </div>

      {transcript.text ? (
        <div className="section-top">
          <Title level={5}>Transcript</Title>
          <Paragraph size={"sm"} className="text-muted-foreground">
            We thought we'd save you some time. Its always faster to speak than
            type.
          </Paragraph>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="resize-none mt-2"
          />
        </div>
      ) : null}
    </div>
  )
}
