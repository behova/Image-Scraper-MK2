import sharp, { strategy } from 'sharp';
import Path from 'path';
import { nanoid } from 'nanoid';
import createBuffer from './createBuffer.js';

async function sharpProcess(url: string) {
    try {
        const date = new Date().toISOString().slice(0, 10);
        const id = nanoid(10);

        const fileName = `${date}${id}`;

        let envPath;
        if (process.env.IMAGES_PATH) {
            envPath = process.env.IMAGES_PATH;
        } else {
            console.log('no ENV variable loaded for path');

            envPath = `${__dirname}/../../../image_files_test`;
        }

        const path = Path.resolve(envPath, fileName);

        const buffer = await createBuffer(url);

        if (buffer) {
            const result = await sharp(buffer).png().toFile(`${path}.png`);
            const thumb = await sharp(buffer)
                .jpeg({
                    quality: 70,
                })
                .resize({
                    width: 500,
                    height: 500,
                    fit: sharp.fit.cover,
                    position: sharp.strategy.attention,
                })
                .toFile(`${path}-thumb.jpeg`);

            if (result && thumb) {
                return path;
            } else {
                console.log('problem with image buffer');
            }
        }
    } catch (error) {
        console.error('sharpProcess', error);
    }
}

export default sharpProcess;
