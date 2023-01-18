import prismaClient from './prisma-client';
import { DB_Image } from '../interfaces/interfacesIndex';

const image: DB_Image = {
    thumbURL: 'http.///youraregay/name/thumb',
    fullURL: 'http.///youraregay/name/full',
    name: 'name',
    source: 'REDDIT',
    pallet: ['#ffff', '#96969'],
};

test('should create DBimage', async () => {
    const result = await prismaClient.create(image);
    expect(result).toBeInstanceOf(Object);
}, 120000);

test('should delete all DBimage', async () => {
    const result = await prismaClient.deleteAll();
    expect(result).toBeInstanceOf(Object);
}, 120000);
