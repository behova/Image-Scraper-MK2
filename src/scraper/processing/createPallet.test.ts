import createBuffer from './createBuffer';
import createPallet from './createPallet';

test('should return an array of pixel data', async () => {
    const sampleUrl =
        'https://upload.wikimedia.org/wikipedia/commons/d/d9/Macracantha_arcuata_-_Curved_Spiny_Spider_%288550192839%29_by_Rushen_edit.jpg';
    const buffer = await createBuffer(sampleUrl);

    if (buffer !== undefined) {
        const array = createPallet(buffer);
        console.log(array);

        expect(array).toBeInstanceOf(Array);
    }
});
