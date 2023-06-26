"use client"

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react"
import Image from "next/image"
import Link from "next/link"
import { Listing, Prisma } from "@prisma/client"
import { Image as ImageIcon, MoreHorizontal, Plus } from "lucide-react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { generateClientDropzoneAccept } from "uploadthing/client"

import { useUploadThing } from "@/lib/uploadthing"
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

export const MediaForm = ({
  listing,
  update,
}: {
  listing: Prisma.ListingGetPayload<{ include: { images: true } }>
  update: (payload: { fileKey: string; fileUrl: string }[]) => Promise<void>
}) => {
  const [pending, startTransition] = useTransition()
  const [files, setFiles] = useState<any[]>(
    listing?.images ? listing.images : []
  )
  const [hasChanged, setHasChanged] = useState(false)
  const previousValueRef = useRef(files)

  useEffect(() => {
    if (!arraysEqual(previousValueRef.current, files)) {
      setHasChanged(true)
    }

    previousValueRef.current = files
  }, [files])

  // Function to compare two arrays
  const arraysEqual = (a: any, b: any) => {
    if (a === b) return true
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setHasChanged(true)
    setFiles((x) => [...x, ...acceptedFiles])
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["image"] ? generateClientDropzoneAccept(["image"]) : undefined,
  })
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!")
    },
    onUploadError: () => {
      alert("error occurred while uploading")
    },
  })
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

  async function onSubmit() {
    let res: any
    if (hasChanged) {
      res = await startUpload([...files.filter((x) => !x.fileUrl)])
    }
    if (res) {
      startTransition(async () => await update(res))
    }
  }

  return (
    <div>
      {files.length === 0 ? (
        <label
          {...getRootProps()}
          className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed text-center transition-colors hover:border-foreground hover:bg-muted-foreground/5"
        >
          <input accept="image/*" className="hidden" {...getInputProps()} />
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
          {...getRootProps()}
          className={buttonVariants({
            variant: "outline",
            className: "mb-6 flex w-full gap-5 cursor-pointer",
          })}
        >
          <input className="hidden" accept="image/*" {...getInputProps()} />
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
              src={file?.fileUrl ? file?.fileUrl : URL.createObjectURL(file)}
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
          <label
            {...getRootProps()}
            className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-dashed text-center transition-colors hover:border-foreground hover:bg-muted-foreground/5"
          >
            <input className="hidden" accept="image/*" {...getInputProps()} />
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
          href={`/listings/create/${listing.id}/offerings`}
          className={buttonVariants({ variant: "link" })}
        >
          Back
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={onSubmit}
                disabled={pending || isUploading || files?.length < 5}
                type="submit"
              >
                {pending || isUploading ? <Spin /> : "Next"}
              </Button>
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
