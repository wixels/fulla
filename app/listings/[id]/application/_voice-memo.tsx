"use client"

type Props = {}
export const VoiceMemo: React.FC<Props> = ({}) => {
  // const [text, setText] = useState("")

  // const {
  //   recording,
  //   speaking,
  //   transcribing,
  //   transcript,
  //   startRecording,
  //   stopRecording,
  // } = useWhisper({
  //   stopTimeout: 1000 * 2,
  //   apiKey: "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",
  // })

  // useEffect(() => {
  //   if (transcript.text) {
  //     setText(transcript.text)
  //     console.log("setText(transcript)::: ", transcript.text)
  //   }
  // }, [transcript])

  return (
    <div>
      {/* <Title showAs={2} style={{ marginTop: 0 }}>
        <Balancer>Tell us about yourself.</Balancer>
      </Title>
      <Paragraph size={"lg"} className="font-normal text-muted-foreground">
        <Balancer>
          Can you briefly describe why you believe you would be an ideal tenant
          for this property and how you plan to maintain and care for it
        </Balancer>
      </Paragraph>

      <div className="mt-8 flex items-center gap-4 rounded-lg bg-muted-foreground/5 p-4">
        <button
          onClick={() => {
            recording ? stopRecording() : startRecording()
          }}
          className="relative flex h-16 w-16 border-spacing-1 items-center justify-center rounded-full border-4 border-white bg-red-500 text-white"
        >
          {recording ? <Square /> : <Mic />}
        </button>
        <div id="wave-panel" className="flex h-[120px] grow items-center">
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
            className="mt-2 resize-none"
          />
        </div>
      ) : null} */}
    </div>
  )
}
