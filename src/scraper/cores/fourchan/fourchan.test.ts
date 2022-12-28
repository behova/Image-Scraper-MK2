import fourChanCore from './fourchan';

test('should output list of [name,[url] key-pairs', async () => {
    const data = await fourChanCore('https://boards.4channel.org/w/2', 5);
    expect(data).toBeInstanceOf(Array);
}, 120000);
