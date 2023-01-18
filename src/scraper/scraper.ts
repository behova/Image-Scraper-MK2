import fs from 'fs';
import { setTimeout } from 'timers/promises';
import { DB_Image } from '../interfaces/interfacesIndex';
import { getCore, getScrollAmount } from './coreList';
import sharpProcess from './processing/sharpProcess';

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
            for (let j in data[i][1]) {
                let object = {} as DB_Image;
                object.name = data[i][0];
                object.source = data[i][1][j];
                object.thumbURL = '';
                object.fullURL = '';
                object.pallet = ['test', 'test', 'test'];

                const fullURL = await sharpProcess(data[i][1][j]);
                if (fullURL !== undefined) {
                    object.fullURL = `${fullURL}.png`;
                    object.thumbURL = `${fullURL}-thumb.jpeg`;

                    let verfied = await verifyFile(object.fullURL);
                    if (verfied) {
                        objects.push(object);
                    }
                }
            }
        }
    }

    return objects;
}

export default scraper;
