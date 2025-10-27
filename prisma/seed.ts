import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        id: "1",
        sku: "BOOK-001",
        title: "Bottle Ka Tufan",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/01-Bottle-ka-tufan.jpg",
        active: true,
      },
      {
        id: "2",
        sku: "BOOK-002",
        title: "Haaye Budhapa",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/02-haay-bhudapa.jpg",
        active: true,
      },
      {
        id: "3",
        sku: "BOOK-003",
        title: "Gar Bhai Na Hota",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/03-gar-bhai-na-hota.jpg",
        active: true,
      },
      {
        id: "4",
        sku: "BOOK-004",
        title: "Kanya Daan",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/04-kanya-daan.jpg",
        active: true,
      },
      {
        id: "5",
        sku: "BOOK-005",
        title: "Prem Jivan Ka Mahamantra",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/05-Prem-Jivan-ka-mhamantra.jpg",
        active: true,
      },
      {
        id: "6",
        sku: "BOOK-006",
        title: "Aatmahatya",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/06-aatmhatya.jpg",
        active: true,
      },
      {
        id: "7",
        sku: "BOOK-007",
        title: "Bhookh",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/07-bhookh.jpg",
        active: true,
      },
      {
        id: "8",
        sku: "BOOK-008",
        title: "Zindagi Ka Naam Dosti",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/08-jindgi-ka-naam-dosti.jpg",
        active: true,
      },
      {
        id: "9",
        sku: "BOOK-009",
        title: "Lohe Ki Deewar",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/09-lohe-ki-divar.jpg",
        active: true,
      },
      {
        id: "10",
        sku: "BOOK-010",
        title: "Mithi Vani",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/10-mithi-vani.jpg",
        active: true,
      },
      {
        id: "11",
        sku: "BOOK-011",
        title: "Samasya",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/11-samasya.jpg",
        active: true,
      },
      {
        id: "12",
        sku: "BOOK-012",
        title: "Meri Nazro Me Azadi",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/12-meri-mazro-m-azadi.jpg",
        active: true,
      },
      {
        id: "13",
        sku: "BOOK-013",
        title: "Sant Sadhana",
        description: "An introduction to Jain dharma and principles.",
        priceCents: 29900,
        imageUrl: "/images/Products/Books/13-sant-sadhu.jpg",
        active: true,
      },
      {
        id: "14",
        sku: "CAL-001",
        title: "Pulak Sagar Ji Divine Wallpaper",
        description: "Pulak Sagar Ji Spiritual and Divine Wallpaper",
        priceCents: 19900,
        imageUrl: "/images/Products/Wallpapers/1.jpeg",
        active: true,
      },
      {
        id: "15",
        sku: "POST-001",
        title: "Pulak Sagar Ji Thoughts",
        description: "A serene artwork perfect for home or meditation space.",
        priceCents: 14900,
        imageUrl: "/images/Products/Thoughts/20.jpg",
        active: true,
      },
    ],
  });

  console.log("✅ Products seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
