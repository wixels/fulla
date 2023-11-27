import { useCallback } from "react"
import Image from "next/image"
import { Expand, Trash2, UploadCloud } from "lucide-react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { generateClientDropzoneAccept } from "uploadthing/client"

import { cn, formatBytes } from "@/lib/utils"

import { buttonVariants } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

type Props = {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  fileTypes?: string[]
}
export const Uploader: React.FC<Props> = ({ files, setFiles, fileTypes }) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  })
  const handleDelete = (index: number) => {
    if (index >= 0 && index < files.length) {
      const updatedFiles = [...files]
      updatedFiles.splice(index, 1)
      setFiles(updatedFiles)
    }
  }
  return (
    <>
      <Card>
        <CardHeader className="border-b border-border p-0">
          <div className="flex flex-row items-center justify-start gap-2 px-4 py-2">
            <div className="flex flex-row items-center justify-center rounded-full border p-2 dark:border-neutral-700">
              <UploadCloud className="h-5 w-5 text-neutral-600" />
            </div>
            <div>
              <p className="mb-0 font-semibold">Upload images</p>
              <p className="-mt-1 text-sm text-neutral-500">
                Drag and drop your images. Will not be saved.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="m-0 p-0">
          <div
            {...getRootProps()}
            className="m-2 flex flex-col items-center justify-start rounded-xl border-[1.5px] border-dashed border-border px-4 py-2 hover:cursor-pointer"
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-start gap-2">
              <UploadCloud
                className={cn(
                  "my-4 h-5 w-5 text-neutral-600",
                  false && "text-blue-500"
                )}
              />
              <p className="font-semibold">
                Choose a file or drag & drop it here
              </p>
              <p className="text-sm text-neutral-500">
                Only files. Up to 50 MB.
              </p>
              <div
                className={buttonVariants({
                  variant: "outline",
                  size: "xs",
                  rounded: "xl",
                  className: "my-2",
                })}
              >
                Select Files
              </div>
            </div>
          </div>
          {files.length > 0 && (
            <div className="flex max-h-52 w-full flex-col items-center justify-start gap-2 overflow-auto border-t px-4 py-2 dark:border-neutral-700">
              <div className="flex w-full flex-row items-center justify-end">
                <p className="rounded-full bg-neutral-100 px-2 py-1 text-sm text-neutral-500">
                  {files.length} {files.length === 1 ? "file" : "files"},{" "}
                  {formatBytes(files.reduce((acc, file) => acc + file.size, 0))}
                </p>
              </div>
              {files.map((file, index) => {
                const previewImage = URL.createObjectURL(file)
                return (
                  <div
                    key={index}
                    className="group flex w-full flex-row items-center justify-between rounded-lg border px-2 py-1 dark:border-neutral-700"
                  >
                    <div className="flex flex-row items-center justify-start gap-2">
                      <div>
                        <div className="relative h-10 w-10">
                          <Image
                            src={previewImage ?? undefined}
                            alt="Preview"
                            fill
                            className="h-full w-full rounded-md border"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start gap-1">
                        <div className="flex flex-row items-center justify-start gap-2">
                          <div className="max-w-[300px] truncate">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="truncate hover:cursor-help">
                                    {file.name}
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{file.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-2">
                          <p className="text-xs text-neutral-500">
                            {formatBytes(file.size)}
                          </p>
                          <div className="flex flex-row items-center justify-start gap-1 rounded-full px-2 py-[0.5px] text-xs">
                            <div className="h-2 w-2 rounded-full bg-green-400" />
                            <p className="text-neutral-500">
                              Staged For Upload
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="hidden flex-row justify-end rounded-lg bg-neutral-100 p-1 text-neutral-400 transition-all hover:cursor-pointer hover:text-black group-hover:flex"
                          >
                            <Expand className="h-4 w-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>{file.name}</DialogTitle>
                          <div className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center rounded-xl bg-neutral-100 ">
                            <Image
                              src={previewImage}
                              alt="Image Preview"
                              fill
                              className="h-full w-full rounded-md border"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <button
                        type="button"
                        className="hidden flex-row justify-end rounded-lg bg-neutral-100 p-1 text-neutral-400 transition-all hover:cursor-pointer hover:text-black group-hover:flex"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
