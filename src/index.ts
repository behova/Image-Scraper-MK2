import fourChanCore from './scraper/cores/fourchan/fourchan';

async function main() {
    await fourChanCore('https://boards.4channel.org/w/2', 5);
}

console.log('running');
main();
