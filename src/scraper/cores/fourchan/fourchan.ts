import puppeteer from 'puppeteer';
import getFourChanSource from './sourceList';

let fourChanCore = async function (scrollAmount: number) {
    let source = getFourChanSource();
    try {
        let result = [];
        //pupeteer init
        const browser = await puppeteer.launch({ headless: false });
        console.log('launching puppeteer');
        const page = await browser.newPage();

        //specify url
        await page.goto(source);
        console.log('root page loaded');
        await page.waitForNetworkIdle();

        console.log(`scrolling ${scrollAmount} times`);

        //Load more images by scrolling down (i) times
        for (let i = 0; i < scrollAmount; i += 1) {
            await page.keyboard.press('PageDown');
            await page.waitForNetworkIdle();
        }

        //cop all image links
        const imgLinks = await page.$$eval('a', (links) => {
            let strings = links.map((link) => link.toString());
            let filtered = strings.filter(
                (link) => link.includes('.jpg') || link.includes('.png'),
            );
            return Array.from(new Set(filtered));
        });

        await browser.close();
        console.log(imgLinks);
        return imgLinks;
    } catch (error) {
        console.log(error);
    }
};

export default fourChanCore;
