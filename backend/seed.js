const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const crops = ['Tomato', 'Potato', 'Yellow Maize', 'Rice', 'Wheat', 'Onion'];
  const mandis = ['Pune Mandi', 'Nashik Mandi', 'Nagpur Mandi'];

  console.log(" Seeding market prices...");

  // Clear existing entries
  await prisma.marketPrice.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  console.log(" Seeding default farmer...");
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

  console.log(" Seeding sample crop listings for the marketplace...");
  const sampleListings = [
    {
      cropName: 'Tomato',
      quantity: 500,
      unit: 'KG',
      price: 20.0,
      imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
      harvestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      farmerId: 1
    },
    {
      cropName: 'Potato',
      quantity: 1200,
      unit: 'KG',
      price: 14.5,
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400',
      harvestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      farmerId: 1
    },
    {
      cropName: 'Yellow Maize',
      quantity: 800,
      unit: 'KG',
      price: 35.0,
      imageUrl: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=400',
      harvestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      farmerId: 1
    },
    {
      cropName: 'Rice',
      quantity: 1500,
      unit: 'KG',
      price: 44.0,
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
      harvestDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      farmerId: 1
    },
    {
      cropName: 'Wheat',
      quantity: 2000,
      unit: 'KG',
      price: 42.0,
      imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400',
      harvestDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      farmerId: 1
    },
    {
      cropName: 'Onion',
      quantity: 600,
      unit: 'KG',
      price: 18.0,
      imageUrl: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=400',
      harvestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      farmerId: 1
    }
  ];

  for (const listing of sampleListings) {
    await prisma.listing.create({
      data: listing
    });
  }

  console.log(" Market data seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
