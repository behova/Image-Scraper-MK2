import scraper from './scraper/scraper.js';
import * as dotenv from 'dotenv';
import prisma from './server/prisma-client.js';
import { CronJob } from 'cron';
import cull from './server/cull.js';

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

async function runCull(sizeToCullAt: number, path: string) {
    let culled = await cull(sizeToCullAt, path);

    culled
        ? console.log(`culled files`, culled.length)
        : console.log('didnt cull any files');
}

const scraperTimer = new CronJob('0 0 */4 * * *', function () {
    const delay = Math.floor(Math.random() * (3.6e6 - 300000) + 300000);

    setTimeout(() => {
        main();
    }, delay);

    console.log(`running scraper in ${delay / 60000} minutes`);
});

const cullTimer = new CronJob('0 0 2 * * *', function () {
    runCull(3e10, '/home/zu/Projects/img-scraper-12-26/image_files');
});

scraperTimer.start();
cullTimer.start();
