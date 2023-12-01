import { cn } from "@/lib/utils"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type Props = {
  total: number
}
export const Graph: React.FC<Props> = ({ total = 56 }) => {
  function generateSinWaveArray(
    numBars: number,
    minValue: number = 15,
    variability: number = 5
  ): number[] {
    const amplitude = 35
    const frequency = (2 * Math.PI) / numBars
    const sinWaveArray: number[] = []

    for (let i = 0; i < numBars; i++) {
      const sinValue = Math.sin(i * frequency)
      const randomVariation = (Math.random() * 2 - 1) * variability // Random value between -variability and variability
      const barHeight =
        Math.round((sinValue + 1) * 0.5 * amplitude) +
        minValue +
        randomVariation
      sinWaveArray.push(barHeight)
    }

    return sinWaveArray
  }
  function generateRandomArray(): number[] {
    const outputArray: number[] = []
    let remainingTotal = 100

    const numValues = Math.floor(Math.random() * 3) + 1 // Randomly choose 1 to 3 numbers

    for (let i = 0; i < numValues - 1; i++) {
      const minValue = 20
      const randomValue =
        Math.floor(
          Math.random() * (remainingTotal - minValue * (numValues - i - 1))
        ) + minValue
      outputArray.push(randomValue)
      remainingTotal -= randomValue
    }

    // Ensure the last value meets the minimum requirement
    const lastValue = Math.max(remainingTotal, 20)
    outputArray.push(lastValue)

    // Shuffle the array for randomness
    for (let i = outputArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]]
    }

    return outputArray
  }
  return (
    <div className="h-60 w-full pt-1 md:pt-2 lg:pt-4 xl:pt-6">
      <div className="group flex h-full w-full items-end justify-between gap-1">
        {generateSinWaveArray(total, 35, 10).map((value, i) => {
          const breakdown = generateRandomArray()
          return (
            <HoverCard closeDelay={0} openDelay={0}>
              <HoverCardTrigger asChild>
                <div
                  style={{
                    height: `${value}%`,
                  }}
                  key={i}
                  className="flex w-full flex-col overflow-hidden rounded-t transition-all ease-in-out group-hover:[&[data-state=closed]]:opacity-20 group-hover:[&[data-state=closed]]:brightness-50"
                >
                  {breakdown.map((value, i) => (
                    <div
                      key={value}
                      style={{ height: `${value}%` }}
                      className={cn("w-full", {
                        "bg-[#68A691]": i === 0,
                        "bg-[#694F5D]": i === 1,
                        "bg-[#BFD3C1]": i === 2,
                      })}
                    />
                  ))}
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                className="flex flex-col"
                side="top"
                align="center"
              >
                <>
                  <span className="text-xs text-muted-foreground/50">
                    Nov, 10th - 15th
                  </span>
                  {breakdown.map((value, subi) => (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn("h-2 w-2 rounded-full", {
                            "bg-[#68A691]": subi === 0,
                            "bg-[#694F5D]": subi === 1,
                            "bg-[#BFD3C1]": subi === 2,
                          })}
                        ></span>
                        <span className="font-bold">Space Name</span>
                      </div>
                      <span>
                        R {new Intl.NumberFormat().format(value * 100)}
                      </span>
                    </div>
                  ))}
                </>
              </HoverCardContent>
            </HoverCard>
          )
        })}
      </div>
    </div>
  )
}
