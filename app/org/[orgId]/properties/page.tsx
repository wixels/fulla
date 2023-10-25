import { Suspense } from "react"
import Link from "next/link"
import { AlignJustify, Building, LayoutGrid, Plus } from "lucide-react"

import { serverClient } from "@/lib/trpc/server"
import { Button, buttonVariants } from "@/components/ui/button"
import { Paragraph } from "@/components/ui/paragraph"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Title } from "@/components/ui/title"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Await } from "@/components/await"
import { Filterables } from "@/components/filterables"

import { columns } from "./_columns"
import { DataTable } from "./_table"

type Props = {
  params: { orgId: string }
}
const PropertiesPage: React.FC<Props> = async ({ params: { orgId } }) => {
  return (
    <div className="gutter section">
      <Title showAs={2}>Properties</Title>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger sizing="sm" variant={"secondary"} className="w-fit">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">All Properties</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Filterables
            filterables={[
              {
                identifier: "filters",
                options: [
                  { id: "published", label: "Published", value: "published" },
                  { id: "draft", label: "Draft", value: "draft" },
                  { id: "archived", label: "Archived", value: "archived" },
                ],
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-2">
          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">
                <AlignJustify className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="grid">
                <LayoutGrid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="scroll">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-gallery-horizontal-end"
                >
                  <path d="M2 7v10" />
                  <path d="M6 5v14" />
                  <rect width="12" height="18" x="10" y="3" rx="2" />
                </svg>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
      <Suspense
        fallback={
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Private</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        }
      >
        <Await promise={serverClient.org.properties({ organizationId: orgId })}>
          {(properties) => (
            <>
              {!properties || !properties?.length ? (
                <div className="gutter relative mt-4 flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-accent py-16">
                  <Title level={2} showAs={4} style={{ margin: 0 }}>
                    Get started with Properties
                  </Title>
                  <Paragraph size={"sm"}>
                    Create your first property to start managing your work.
                  </Paragraph>
                  <Link
                    scroll={false}
                    href={"./properties/create"}
                    className={buttonVariants({
                      size: "xs",
                      className: "w-fit",
                    })}
                  >
                    <Plus className="mr-2 h-3 w-3" />
                    Create a Property
                  </Link>
                  <Building
                    className="absolute right-[25%] top-0 rotate-[-20deg] text-muted-foreground/25"
                    size={300}
                  />
                </div>
              ) : (
                // @ts-ignore
                <DataTable columns={columns} data={properties} />
              )}
            </>
          )}
        </Await>
      </Suspense>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              scroll={false}
              href={"./properties/create"}
              className={buttonVariants({
                size: "icon",
                rounded: "full",
                className: "fixed bottom-14 right-14",
              })}
            >
              <Plus className="h-4 w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent align="end">Create a new property</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
export default PropertiesPage
