const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

async function main() {
    // Connect to database
    try {
        await prisma.$connect();
        console.log('DB connection successful!');
    } catch (err) {
        console.error('DB connection failed!', err);
    }
}

main();
