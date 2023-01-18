import saveUrl from './saveUrl';

test('should save sample image url to path specified in ENV and return the path with name as string', async () => {
    const sampleUrl =
        'https://upload.wikimedia.org/wikipedia/commons/d/d9/Macracantha_arcuata_-_Curved_Spiny_Spider_%288550192839%29_by_Rushen_edit.jpg';
    const filePath = await saveUrl(sampleUrl);
    console.log(filePath);
    expect(typeof filePath).toBe('string');
});
