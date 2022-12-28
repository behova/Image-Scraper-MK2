import getCore from './coreList';

async function scraper() {
    const core = getCore();

    const data = await core(5);

    console.log(data);
}

export default scraper;
