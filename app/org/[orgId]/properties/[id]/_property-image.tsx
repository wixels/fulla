"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { ImageIcon, Loader2 } from "lucide-react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { generateClientDropzoneAccept } from "uploadthing/client"

import { trpc } from "@/lib/trpc/client"
import { useUploadThing } from "@/lib/uploadthing"
import { useToast } from "@/hooks/use-toast"

type Props = {
  id: string
  url?: string
  fallback?: string
  alt?: string
}
export const PropertyImage: React.FC<Props> = ({
  url,
  id,
  fallback,
  alt = "Property logo",
}) => {
  const [file, setFile] = useState(url)
  const { toast } = useToast()
  const utils = trpc.useContext()
  const updateProperty = trpc.org.updateProperty.useMutation({
    onMutate: async () => {
      await utils.org.properties.cancel()
      await utils.org.property.cancel()
    },
    onSettled: () => {
      void utils.org.properties.invalidate()
      void utils.org.property.invalidate()
    },
  })
  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    setFile(URL.createObjectURL(acceptedFiles[0]))
    const image = await startUpload([acceptedFiles[0]])
    if (image) {
      const update = updateProperty.mutateAsync({
        id,
        data: {
          logo: {
            connectOrCreate: {
              create: {
                fileKey: image[0].fileKey,
                fileUrl: image[0].fileUrl,
              },
              where: {
                id,
              },
            },
          },
        },
      })
      console.log("update::: ", update)
    }
  }, [])

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: () => {
        toast({
          description: "Successfully uploaded image",
        })
      },
      onUploadError: () => {
        toast({
          variant: "destructive",
          title: "An upload error occurred",
          description: "Please try again later",
        })
      },
    }
  )

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  })
  return (
    <label
      {...(!isUploading ? getRootProps : {})}
      className="group relative flex aspect-square w-full max-w-[100px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-tl from-cyan-400 to-red-300 transition-opacity"
    >
      {!isUploading ? (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm group-hover:opacity-100">
          <ImageIcon className="h-5 w-5 text-white" />
        </div>
      ) : null}
      {isUploading ? (
        <div className="absolute inset-0 z-50 flex h-full w-full items-center justify-center rounded-full bg-black/10 backdrop-blur-sm">
          <Loader2 className="h-3 w-3 animate-spin text-white" />
        </div>
      ) : null}
      {!isUploading ? <input {...getInputProps()} className="hidden" /> : null}
      {file ? (
        <Image src={file} fill className="object-cover" alt={alt} />
      ) : (
        <p className="text-4xl text-white">{fallback}</p>
      )}
    </label>
  )
}
