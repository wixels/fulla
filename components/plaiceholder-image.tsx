import Image from "next/image"
import { getPlaiceholder } from "plaiceholder"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
  src: string
  alt: string
  type?: "blur" | "color"
  hasParent?: boolean
}
export const PlaiceholderImage: React.FC<Props> = async ({
  className,
  type = "blur",
  src,
  hasParent = false,
  alt,
}) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  )
  const { base64, color } = await getPlaiceholder(buffer)
  if (type === "blur" && hasParent) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover")}
        {...(type === "blur"
          ? { placeholder: "blur", blurDataURL: base64 }
          : {})}
      />
    )
  } else
    return (
      <div
        style={type === "color" ? { backgroundColor: color.hex } : {}}
        className={cn("relative overflow-hidden", className)}
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
