import sharpProcess from './sharpProcess';

test('should save take sample path and convert image to 500x500 jpg', async () => {
    const samplePath = 'https://i.4cdn.org/wg/1673840565981606.jpg';
    const returnData = await sharpProcess(samplePath);
    console.log(returnData);
    expect(typeof returnData).toBe('string');
});
