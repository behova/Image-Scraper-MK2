import fs from 'fs';
import { DB_Image } from '../interfaces/interfacesIndex.js';
import { getCore, getScrollAmount } from './coreList.js';
import prisma from '../server/prisma-client.js';
import sharpProcess from './processing/sharpProcess.js';

//needs try-catch add finally blocks

async function verifyFile(path: string): Promise<boolean> {
    const timeOut = 5000;
    let totalTime = 0;
    let checkTime = timeOut / 10;

    return await new Promise((resolve, reject) => {
        try {
            const timer = setInterval(function () {
                totalTime += checkTime;

                let fileExist = fs.existsSync(path);

                if (fileExist || totalTime >= timeOut) {
                    clearInterval(timer);

                    resolve(fileExist);
                }
            }, checkTime);
        } catch (error) {
            console.log(error);
            return reject;
        }
    });
}

async function scraper() {
    try {
        let objects: DB_Image[] = [];

        const core = getCore();
        const scrollAmount = getScrollAmount();

        const data = await core(scrollAmount, true);

        let duplicateLog = 0;

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

                        let verfiedThumb = await verifyFile(object.thumbURL);
                        let verfiedFull = await verifyFile(object.fullURL);
                        if (verfiedThumb && verfiedFull) {
                            console.log(
                                `\u2611 ${object.fullURL} \u2605 ${object.thumbURL}`,
                            );
                            // const file = fs.readFileSync(object.thumbURL);
                            // const pallet = createPallet(file);
                            // object.pallet = pallet;

                            objects.push(object);
                        }
                    }
                } else if (exists === undefined) {
                    console.log('could not verify duplicate with DB');
                } else {
                    duplicateLog += 1;
                }
            }
        }

        console.log(`Image source already exists (${duplicateLog})`);

        return objects;
    } catch (error) {
        console.log(error);
    }
}

export default scraper;
