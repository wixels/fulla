import { generateReactHelpers } from "@uploadthing/react/hooks"

import { OurFileRouter } from "@/config/uploadthing-config"

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>()
