export const spaceCreationSteps = [
  {
    keys: "title",
    path: "/title",
    name: "Title",
    label: "Add a title to your space",
    nextPath: "/type",
    previousPath: null,
  },
  {
    keys: "type",
    path: "/type",
    name: "Type",
    label: "What type of space do you have?",
    nextPath: "/category",
    previousPath: "/title",
  },
  {
    keys: "category",
    path: "/category",
    name: "Category",
    label: "What category is your space?",
    nextPath: "/address",
    previousPath: "/type",
  },
  {
    keys: ["province", "street", "unitNumber", "city", "suburb", "postalCode"],
    path: "/address",
    name: "Address",
    label: "Where is your space?",
    nextPath: "/features",
    previousPath: "/category",
  },
  {
    keys: ["rooms", "desks", "bathrooms"],
    path: "/features",
    name: "Features",
    label: "What does your space feature?",
    nextPath: "/images",
    previousPath: "/address",
  },
  {
    keys: "images",
    path: "/images",
    name: "Images",
    label: "What does your space look like?",
    nextPath: "/highlights",
    previousPath: "/offerings",
  },
  {
    keys: "highlights",
    path: "/highlights",
    name: "Highlights",
    nextPath: "/description",
    previousPath: "/images",
  },
  {
    keys: "description",
    path: "/description",
    name: "Description",
    // label: "What makes your space stand out?",
    nextPath: "/price",
    previousPath: "/highlights",
  },
  {
    keys: "price",
    path: "/price",
    name: "Price",
    label: "How much does your space cost?",
    nextPath: null,
    previousPath: "/highlights",
  },
]
