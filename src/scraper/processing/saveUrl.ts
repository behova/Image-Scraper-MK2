import axios, { AxiosError } from 'axios';
import Fs from 'fs';
import Path from 'path';
import { nanoid } from 'nanoid';

async function saveUrl(url: string) {
    //saves file to path specified in env
    try {
        const date = new Date().toISOString().slice(0, 10);
        const id = nanoid(10);

        const fileName = url.includes('.png')
            ? `${date}${id}.png`
            : `${date}${id}.jpg`;

        let envPath;
        if (process.env.IMAGES_PATH) {
            envPath = process.env.IMAGES_PATH;
        } else {
            console.log('no ENV variable loaded for path');
            //make this more generic
            envPath = `${__dirname}/../../../image_files`;
        }

        const path = Path.resolve(envPath, fileName);
        const writer = Fs.createWriteStream(path);

        const response = await axios.get(url, {
            responseType: 'stream',
        });

        await response.data.pipe(writer);

        return path;

        ///
    } catch (error: any | AxiosError) {
        if (error.response) {
            // Request made and server responded
            console.error(`Axios savefullURL ${error.response.status}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Axios savefullURL', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('saveSingle', error);
        }
    }
}
export default saveUrl;
