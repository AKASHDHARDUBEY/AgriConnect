const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const crops = ['Tomato', 'Potato', 'Yellow Maize', 'Rice', 'Wheat', 'Onion'];
  const mandis = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

  console.log("🌱 Seeding market prices...");

  // Clear existing entries
  await prisma.marketPrice.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 Seeding default farmer...");
  await prisma.user.create({
    data: {
      id: 1,
      name: "Ramesh Kumar",
      email: "ramesh@agriconnect.com",
      phone: "+919876543210",
      role: "FARMER",
      location: "Nashik, Maharashtra"
    }
  });

  for (const crop of crops) {
    for (const mandi of mandis) {
      // Create 10 days of fake historical prices for each crop/mandi
      for (let i = 0; i < 10; i++) {
        let basePrice = 25;
        if (crop === 'Tomato') basePrice = 20;
        else if (crop === 'Potato') basePrice = 15;
        else if (crop === 'Rice') basePrice = 45;
        else if (crop === 'Wheat') basePrice = 30;
        else if (crop === 'Onion') basePrice = 18;
        const randomVariation = Math.floor(Math.random() * 10) - 5; // +/- 5 rupees

        await prisma.marketPrice.create({
          data: {
            cropName: crop,
            mandiName: mandi,
            modalPrice: basePrice + randomVariation,
            minPrice: basePrice + randomVariation - 2,
            maxPrice: basePrice + randomVariation + 2,
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          },
        });
      }
    }
  }
  console.log("✅ Market data seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
