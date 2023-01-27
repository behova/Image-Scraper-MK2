import getFolderSize from 'get-folder-size';
import prisma from './prisma-client.js';
import fs from 'fs';

async function cull(size: number, path: string) {
    try {
        const totalSize = await getFolderSize.loose(path);
        console.log(totalSize);
        let rmFromDB = [];

        if (totalSize >= size) {
            let imagesToDelete = await prisma.getCull();
            console.log(imagesToDelete);

            if (imagesToDelete) {
                for (let i in imagesToDelete) {
                    let fullPath = imagesToDelete[i].fullURL;
                    let thumbPath = imagesToDelete[i].thumbURL;

                    fs.rmSync(fullPath, { force: true });
                    fs.rmSync(thumbPath, { force: true });

                    rmFromDB.push(fullPath);
                }
                return prisma.deleteMany(rmFromDB);
            } else {
                console.log('problem with retrieving images to delete');
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default cull;
