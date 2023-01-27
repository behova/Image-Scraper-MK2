import { PrismaClient } from '@prisma/client';
import { DB_Image, Source } from '../interfaces/interfacesIndex.js';

const prisma = new PrismaClient();

async function create(newImage: DB_Image) {
    try {
        const image = await prisma.image.create({
            data: newImage,
        });

        console.log(image);
        return image;
    } catch (error) {
        console.log(error);
    }

    await prisma.$disconnect();
}

async function createMany(newImages: DB_Image[]) {
    let upload = 0;

    for (let i in newImages) {
        try {
            const image = await prisma.image.create({
                data: newImages[i],
            });
            if (image) {
                upload += 1;
            }
        } catch (error) {
            console.log(error);
        }
    }
    await prisma.$disconnect();
    return upload;
}

//read untested
async function read(page?: number, source?: Source) {
    try {
        let images;
        if (page && source) {
            switch (source) {
                case 1:
                    images = await prisma.image.findMany({
                        skip: page * 25,
                        take: 25,
                        where: {
                            source: {
                                contains: 'Reddit',
                            },
                        },
                    });
                case 2:
                    images = await prisma.image.findMany({
                        skip: page * 25,
                        take: 25,
                        where: {
                            source: {
                                contains: '4Chan',
                            },
                        },
                    });
            }
        } else if (page) {
            images = await prisma.image.findMany({
                skip: page * 25,
                take: 25,
            });
        } else {
            images = await prisma.image.findMany();
        }

        console.log(images);
    } catch (error) {
        console.log(error);
    }

    await prisma.$disconnect();
}

async function findUnique(url: string) {
    try {
        const result = await prisma.image.findFirst({
            where: {
                source: url,
            },
        });

        return result;
    } catch (error) {
        console.log('getCull', error);
    }
    await prisma.$disconnect();
}

async function getCull() {
    try {
        const count = await prisma.image.count();

        let images = await prisma.image.findMany({
            take: Math.floor(count / 3),
        });

        return images;
    } catch (error) {
        console.log('getCull', error);
    }

    await prisma.$disconnect();
}

async function deleteMany(images: string[]) {
    try {
        let deletedImages = [];

        for (let i in images) {
            let deleted = await prisma.image.delete({
                where: {
                    fullURL: images[i],
                },
            });
            deletedImages.push(deleted);
        }

        return deletedImages;
    } catch (error) {
        console.log(error);
    }

    await prisma.$disconnect();
}

async function deleteAll() {
    try {
        const images = await prisma.image.deleteMany({});

        console.log(images);
        return images;
    } catch (error) {
        console.log(error);
    }

    await prisma.$disconnect();
}

export default {
    create,
    createMany,
    read,
    deleteAll,
    getCull,
    deleteMany,
    findUnique,
};
