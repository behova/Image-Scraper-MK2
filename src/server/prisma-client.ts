import { PrismaClient } from '@prisma/client';
import { DB_Image, Source } from '../interfaces/interfacesIndex';

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
    for (let i in newImages) {
        try {
            const image = await prisma.image.create({
                data: newImages[i],
            });

            console.log(image);
        } catch (error) {
            console.log(error);
        }
    }

    await prisma.$disconnect();
}

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

export default { create, createMany, read, deleteAll };
