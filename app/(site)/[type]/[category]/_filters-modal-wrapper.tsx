import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FiltersModal } from "@/components/filters-modal"

type Props = {}
export const FiltersModalWrapper: React.FC<Props> = async ({}) => {
  const [types, offerings, highlights, categories, amenities] =
    await Promise.all([
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/types`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/offerings`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/highlights`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
      await (async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/amenities`,
          {
            next: {
              revalidate: 60 * 30,
            },
          }
        )
        return res.json()
      })(),
    ])

  return (
    <FiltersModal
      types={types}
      offerings={offerings}
      highlights={highlights}
      categories={categories}
      amenities={amenities}
    >
      <Button className="bg-primary/10" size={"sm"} variant={"secondary"}>
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filters
      </Button>
    </FiltersModal>
  )
}
