import fs from 'fs';
import { setTimeout } from 'timers/promises';
import { DB_Image } from '../interfaces/interfacesIndex.js';
import { getCore, getScrollAmount } from './coreList.js';
import prisma from '../server/prisma-client.js';
import sharpProcess from './processing/sharpProcess.js';
import createPallet from './processing/createPallet.js';

async function verifyFile(path: string) {
    if (fs.existsSync(path)) {
        return true;
    } else {
        await setTimeout(5000);
        if (fs.existsSync(path)) {
            return true;
        } else {
            await setTimeout(5000);
            if (fs.existsSync(path)) {
                return true;
            }
        }
    }
    return false;
}

async function scraper() {
    let objects: DB_Image[] = [];

    const core = getCore();
    const scrollAmount = getScrollAmount();

    const data = await core(scrollAmount, true);

    if (data !== undefined) {
        for (let i in data) {
            let object = {} as DB_Image;
            object.name = data[i][0];
            object.source = data[i][1];
            object.thumbURL = '';
            object.fullURL = '';
            object.pallet = '';

            //check database if source already exists before running sharp
            const exists = await prisma.findUnique(object.source);

            if (exists === null) {
                const fullURL = await sharpProcess(data[i][1]);

                if (fullURL !== undefined) {
                    object.fullURL = `${fullURL}.png`;
                    object.thumbURL = `${fullURL}-thumb.jpeg`;

                    let verfied = await verifyFile(object.fullURL);
                    if (verfied) {
                        const file = fs.readFileSync(object.thumbURL);
                        const pallet = createPallet(file);
                        object.pallet = pallet;

                        objects.push(object);
                    }
                }
            }
        }
    }

    return objects;
}

export default scraper;
