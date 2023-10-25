"use client"

import { useRouter } from "next/navigation"

import { trpc } from "@/lib/trpc/client"
import { LoaderButton } from "@/components/loader-button"

type Props = {
  orgId: string
  propertyId: string
}
export const NewPageButton: React.FC<Props> = ({ orgId, propertyId }) => {
  const utils = trpc.useContext()
  const router = useRouter()
  const addActivity = trpc.activity.createActivity.useMutation()
  const createPage = trpc.page.create.useMutation({
    onMutate: async () => {
      await utils.page.list.invalidate()
    },
    onSuccess: async (data) => {
      await addActivity.mutateAsync({
        data: {
          pageId: data.id,
          verb: "created",
          propertyId,
          descriptor: "a new page: " + data.title,
        },
      })
      router.push("../../pages/" + data.id)
    },
    onSettled: () => {
      utils.page.list.invalidate()
    },
  })
  return (
    <LoaderButton
      onClick={() => {
        createPage.mutate({
          data: {
            title: "untitled",
            organizationId: orgId,
            propertyId,
          },
        })
      }}
      pending={createPage.isLoading}
      size="xs"
      variant="secondary"
      className="w-fit"
      icon="Plus"
    >
      New Page
    </LoaderButton>
  )
}
