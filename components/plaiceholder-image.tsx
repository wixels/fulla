import Image from "next/image"
import { getPlaiceholder } from "plaiceholder"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
  src: string
  alt: string
  type?: "blur" | "color"
}
export const PlaiceholderImage: React.FC<Props> = async ({
  className,
  type = "blur",
  src,
  alt,
}) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  )
  const { base64, color } = await getPlaiceholder(buffer)
  return (
    <div
      style={type === "color" ? { backgroundColor: color.hex } : {}}
      className={cn("relative", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover")}
        {...(type === "blur"
          ? { placeholder: "blur", blurDataURL: base64 }
          : {})}
      />
    </div>
  )
}
