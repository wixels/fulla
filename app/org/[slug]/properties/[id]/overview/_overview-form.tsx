"use client"

import { useEffect } from "react"

import { trpc } from "@/lib/trpc/client"
import { useDebouncedState } from "@/hooks/use-debounced-state"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ToastAction } from "@/components/ui/toast"

const propertyTypes = [
  {
    group: "Residential",
    options: [
      { value: "Single-Family Home", label: "Single-Family Home" },
      { value: "Apartment", label: "Apartment" },
      { value: "Condominium", label: "Condominium" },
      { value: "Townhouse", label: "Townhouse" },
      { value: "Duplex", label: "Duplex" },
      { value: "Mobile/Manufactured Home", label: "Mobile/Manufactured Home" },
    ],
  },
  {
    group: "Commercial",
    options: [
      { value: "Office Building", label: "Office Building" },
      { value: "Retail Space", label: "Retail Space" },
      { value: "Industrial/Warehouse", label: "Industrial/Warehouse" },
      { value: "Restaurant/Bar", label: "Restaurant/Bar" },
      { value: "Hotel/Motel", label: "Hotel/Motel" },
      { value: "Shopping Center", label: "Shopping Center" },
      { value: "Gas Station", label: "Gas Station" },
      { value: "Medical/Dental Office", label: "Medical/Dental Office" },
      { value: "Mixed-Use Property", label: "Mixed-Use Property" },
    ],
  },
  {
    group: "Land",
    options: [
      { value: "Residential Land", label: "Residential Land" },
      { value: "Commercial Land", label: "Commercial Land" },
      { value: "Agricultural Land", label: "Agricultural Land" },
      { value: "Industrial Land", label: "Industrial Land" },
    ],
  },
  {
    group: "Special Purpose",
    options: [
      { value: "School/University", label: "School/University" },
      {
        value: "Hospital/Healthcare Facility",
        label: "Hospital/Healthcare Facility",
      },
      {
        value: "Church/Religious Building",
        label: "Church/Religious Building",
      },
      {
        value: "Sports/Entertainment Venue",
        label: "Sports/Entertainment Venue",
      },
      { value: "Government Building", label: "Government Building" },
      { value: "Parking Garage/Lot", label: "Parking Garage/Lot" },
      { value: "Marina/Boat Slip", label: "Marina/Boat Slip" },
      { value: "Airport Hangar", label: "Airport Hangar" },
    ],
  },
]

type Props = {
  id: string
  defaultValues: {
    address: string
    type: string
    size: string
  }
}

const OverviewForm: React.FC<Props> = ({ id, defaultValues }) => {
  const [address, setAddress] = useDebouncedState(defaultValues.address, 1000)
  const [type, setType] = useDebouncedState(defaultValues.type, 1000)
  const [size, setSize] = useDebouncedState(defaultValues.size, 1000)
  const { toast } = useToast()
  const addActivity = trpc.activity.createActivity.useMutation({
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! There was a problem saving your activity.",
        description: "Don't worry, we've already notified our engineers.",
      })
    },
  })
  const { mutateAsync } = trpc.org.updateProperty.useMutation({
    onSuccess() {
      // utils.space.draft.invalidate({ id })
      // router.push("." + step.nextPath)
      toast({
        title: "Updated",
        description: "Successfully updated property",
      })
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    },
  })

  useEffect(() => {
    const runUpdate = async () => {
      if (address === defaultValues.address) return
      await mutateAsync({
        data: {
          address,
        },
        id,
      })
      addActivity.mutate({
        data: {
          propertyId: id,
          verb: "updated",
          descriptor: "the property's address",
        },
      })
    }
    runUpdate()
  }, [address])
  useEffect(() => {
    const runUpdate = async () => {
      if (type === defaultValues.type) return
      await mutateAsync({
        data: {
          type,
        },
        id,
      })
      addActivity.mutate({
        data: {
          propertyId: id,
          verb: "updated",
          descriptor: "the property's type",
        },
      })
    }
    runUpdate()
  }, [type])
  useEffect(() => {
    const runUpdate = async () => {
      if (size === defaultValues.size) return
      await mutateAsync({
        data: {
          size,
        },
        id,
      })
      addActivity.mutate({
        data: {
          propertyId: id,
          verb: "updated",
          descriptor: "the property's size",
        },
      })
    }
    runUpdate()
  }, [size])

  return (
    <ul>
      <li className="flex items-center gap-4 border-y py-2">
        <Label className="w-1/6">Address</Label>
        <Input
          defaultValue={address}
          onChange={(event) => setAddress(event.currentTarget.value)}
          placeholder="Please enter an address"
          variant="ghost"
        />
      </li>
      <li className="flex items-center gap-4 border-b py-2">
        <Label className="w-1/6">Property Type</Label>
        <Select defaultValue={type} onValueChange={(value) => setType(value)}>
          <SelectTrigger variant={"ghost"}>
            <SelectValue placeholder="Please select a property type" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[20vh]">
              {propertyTypes.map((type) => (
                <SelectGroup key={type.group}>
                  <Separator className="my-2" />
                  <SelectLabel>{type.group}</SelectLabel>
                  {type.options.map((opt) => (
                    <SelectItem key={opt.label} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </li>
      <li className="flex items-center gap-4 border-b py-2">
        <Label className="w-1/6">Property Size</Label>
        <Input
          defaultValue={size}
          onChange={(event) => setSize(event.currentTarget.value)}
          placeholder="Please enter a property size (sqm)"
          variant="ghost"
        />
      </li>
    </ul>
  )
}

export default OverviewForm
