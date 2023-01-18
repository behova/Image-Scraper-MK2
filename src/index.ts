import scraper from './scraper/scraper';
import * as dotenv from 'dotenv';
import prisma from './server/prisma-client';

async function main() {
    dotenv.config(); //load environment variables from .env

    let objects = await scraper();

    try {
        let upload = prisma.createMany(objects);
        console.log(upload);
    } catch (error) {
        console.log(error);
    }
}

main();
