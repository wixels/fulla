"use client"

import React, { ChangeEvent, useState, useTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { ImageIcon, Menu, MoreHorizontal, Plus } from "lucide-react"

import { Listing } from "@/types/payload-types"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ListingFooter } from "@/components/listing-footer"
import { Spin } from "@/components/spin"

type FileObject = File & { preview: string }

export const MediaForm = ({
  update,
  listing,
}: {
  update: (payload: FileObject[]) => Promise<void>
  listing: Listing
}) => {
  const [pending, startTransition] = useTransition()
  const [files, setFiles] = useState<FileObject[]>([])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files as FileList)

    const newFiles = selectedFiles
      .slice(0, 5 - files.length) // Limit to remaining slots in the state
      .map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ) as FileObject[]

    const updatedFiles = files.concat(newFiles)
    setFiles(updatedFiles)
  }

  const removeImage = (index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1)
      return updatedFiles
    })
  }

  const swapImage = (index: number) => {
    if (index === 0) return

    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles]
      ;[updatedFiles[0], updatedFiles[index]] = [
        updatedFiles[index],
        updatedFiles[0],
      ]
      return updatedFiles
    })
  }

  function onSubmit() {
    startTransition(async () => await update(files))
  }

  return (
    <div>
      {files.length === 0 ? (
        <label className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed text-center transition-colors hover:border-foreground hover:bg-muted-foreground/5">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <ImageIcon size={128} />
          <Title className="font-semibold" level={5}>
            Click here to add photos
          </Title>
          <Paragraph className="text-muted-foreground">
            Choose at least 5 photos
          </Paragraph>
        </label>
      ) : (
        <label
          className={buttonVariants({
            variant: "outline",
            className: "mb-6 flex w-full gap-5 cursor-pointer",
          })}
        >
          <input
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <Plus /> Add More
        </label>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className={`relative ${
              index === 0
                ? "col-span-2 aspect-video"
                : "col-span-2 aspect-square"
            } overflow-hidden rounded-lg ${index > 0 ? "lg:col-span-1" : ""}`}
          >
            <Image
              fill
              className="object-cover"
              alt="house primary image"
              src={file.preview}
            />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-4">
              {index === 0 ? (
                <Badge className="invisible" color={"dark"}>
                  Cover Image
                </Badge>
              ) : (
                <div />
              )}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={"sm"} variant={"secondary"} rounded={"full"}>
                    <MoreHorizontal size={12} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Media Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => removeImage(index)}>
                    Delete
                  </DropdownMenuItem>
                  {index > 0 && (
                    <DropdownMenuItem onClick={() => swapImage(index)}>
                      Make Cover Image
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
        {files.length < 5 && files?.length > 0 ? (
          <label className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-dashed text-center transition-colors hover:border-foreground hover:bg-muted-foreground/5">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <ImageIcon size={24} />
            <Paragraph>It looks great!</Paragraph>
            <Paragraph size={"sm"} className="text-muted-foreground">
              We need {5 - files?.length} more
            </Paragraph>
          </label>
        ) : null}
      </div>
      <ListingFooter progress={22}>
        <Link
          href={`/listings/${listing.id}/offerings`}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/listings/${listing.id}/title`}
                className={buttonVariants({})}
              >
                Next
              </Link>
              {/* <Button
                onClick={onSubmit}
                disabled={files?.length < 5}
                type="submit"
              >
                {pending ? <Spin /> : "Next"}
              </Button> */}
            </TooltipTrigger>
            {files.length < 5 ? (
              <TooltipContent>
                <Paragraph size={"sm"}>Please upload 5 images</Paragraph>
              </TooltipContent>
            ) : null}
          </Tooltip>
        </TooltipProvider>
      </ListingFooter>
    </div>
  )
}
