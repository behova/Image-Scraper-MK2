import redditCore from './reddit';

// describe('output reddit core', () => {
//     it('should output list of [name,[url] key-pairs', () => {
//         expect(redditCore('https://www.reddit.com/r/wallpapers/', 5));
//     });
// });

test('should output list of [name,[url] key-pairs', async () => {
    const data = await redditCore(5, false);
    console.log(data);
    expect(data).toBeInstanceOf(Array);
}, 120000);
