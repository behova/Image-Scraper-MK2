import scraper from './scraper/scraper';
import * as dotenv from 'dotenv';
import prisma from './server/prisma-client';
import { CronJob } from 'cron';

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

const cronTimer = new CronJob('0 0 */4 * * *', function () {
    const delay = Math.floor(Math.random() * (3.6e6 - 300000) + 300000);

    setTimeout(() => {
        main();
    }, delay);

    console.log(`running scraper in ${delay / 60000} minutes`);
});

cronTimer.start();
