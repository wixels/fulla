const { PrismaClient } = require("@prisma/client")
const {
  amenities,
  categories,
  highlights,
  offerings,
  types,
} = require("./data.js")
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.category.deleteMany()
    await prisma.type.deleteMany()
    await prisma.amenity.deleteMany()
    await prisma.highlight.deleteMany()
    await prisma.offering.deleteMany()
    await prisma.listing.deleteMany()

    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Offering AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Highlight AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Amenity AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Type AUTO_INCREMENT = 1`

    await prisma.listing.create({
      data: {
        authorId: "clj5o5sxh0000ls6ve3vp2xwf",
        title: "Soho Apartment",
        description: "A very cool place",
        price: 14000,
      },
    })

    await prisma.category.createMany({
      data: categories,
    })
    await prisma.type.createMany({
      data: types,
    })
    await prisma.amenity.createMany({
      data: amenities,
    })
    await prisma.highlight.createMany({
      data: highlights,
    })
    await prisma.offering.createMany({
      data: offerings,
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
