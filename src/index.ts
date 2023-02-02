import scraper from './scraper/scraper.js';
import * as dotenv from 'dotenv';
import prisma from './server/prisma-client.js';
import { CronJob } from 'cron';
import cull from './server/cull.js';

async function main() {
    try {
        let objects = await scraper();

        if (objects) {
            let upload = await prisma.createMany(objects);
            console.log(`uploaded ${upload} Images`);
            return true;
        }
    } catch (error) {
        console.log(error);
    }
}

async function runCull(sizeToCullAt: number) {
    let culled = await cull(sizeToCullAt);

    culled
        ? console.log(`culled files`, culled.length)
        : console.log('didnt cull any files');
}

function index() {
    dotenv.config(); //load environment variables from .env

    const scraperTimer = new CronJob('0 */15 * * * *', function () {
        const delay = Math.floor(Math.random() * (360000 - 300000) + 300000);

        setTimeout(main, delay);

        console.log(`running scraper in ${Math.floor(delay / 60000)} minutes`);
    });

    const cullTimer = new CronJob('0 0 2 * * *', async function () {
        await runCull(3e10);
    });

    scraperTimer.start();
    console.log('started scraper timer');
    cullTimer.start();
    console.log('started culltimer');
}

index();
