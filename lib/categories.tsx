import {
  Droplet,
  Gem,
  Home,
  Mountain,
  MountainSnow,
  Palmtree,
  Snowflake,
  Tent,
  Trees,
  Waves,
  Wind,
} from "lucide-react"

type category = {
  label: string
  icon: React.ReactNode
  description: string
}
export const CategoriesList: category[] = [
  {
    label: "Beach",
    icon: <Palmtree />,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: <Wind />,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: <Home />,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: <Mountain />,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: <Droplet />,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: <Palmtree />,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: <Waves />,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: <Snowflake />,
    description: "This property has skiing activies!",
  },

  {
    label: "Caves",
    icon: <MountainSnow />,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: <Tent />,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: <Snowflake />,
    description: "This property is in arctic environment!",
  },
  {
    label: "Barns",
    icon: <Trees />,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: <Gem />,
    description: "This property is brand new and luxurious!",
  },
]
