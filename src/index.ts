import {
    dbCreateTest,
    dbDeleteTest,
    dbSelectTest,
} from '../prisma/prisma-client';

async function main() {
    await dbCreateTest();
    await dbSelectTest();
    await dbDeleteTest();
}

main();
