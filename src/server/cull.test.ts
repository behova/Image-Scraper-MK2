import cull from './cull';

test('should return 1/3 DB_Images removed from DB', async () => {
    const result = await cull(1);
    console.log(result);
    expect(result).toBeInstanceOf(Array);
}, 1200000);
