"use client"

import React, { ChangeEvent, useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"

import { Listing } from "@/types/payload-types"
import { Paragraph } from "@/components/ui/paragraph"
import { Title } from "@/components/ui/title"

type FileObject = File & { preview: string }

export const MediaForm = ({
  update,
  listing,
}: {
  update: (payload: Pick<Listing, "featureImage" | "images">) => Promise<void>
  listing: Listing
}) => {
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
    if (index === 0) return // Skip if it's already the first image

    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles]
      ;[updatedFiles[0], updatedFiles[index]] = [
        updatedFiles[index],
        updatedFiles[0],
      ] // Swap first and clicked images
      return updatedFiles
    })
  }

  return (
    <div>
      {files.length < 5 && (
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
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
            {index > 0 && (
              <button
                className="absolute top-2 left-2 text-gray-500 bg-white rounded-full hover:text-blue-500 hover:bg-gray-200"
                onClick={() => swapImage(index)}
              >
                Swap
              </button>
            )}
            <button
              className="absolute right-2 top-2 rounded-full bg-white text-gray-500 hover:bg-gray-200 hover:text-red-500"
              onClick={() => removeImage(index)}
            >
              X
            </button>
          </div>
        ))}
        {files.length < 5 && files?.length > 0 ? (
          <label className="flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed text-center">
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
    </div>
  )
}
