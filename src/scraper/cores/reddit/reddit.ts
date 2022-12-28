import puppeteer from 'puppeteer';
import getRedditSource from './sourceList';

let redditCore = async function (scrollAmount: number) {
    let source = getRedditSource();
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
                (link) => link.includes('comment') && link.length < 100,
            );
            return Array.from(new Set(filtered));
        });
        for (let link in imgLinks) {
            let obj = [];
            await page.goto(imgLinks[link]);
            await page.keyboard.press('PageDown');
            await page.keyboard.press('PageDown');
            await page.keyboard.press('PageDown');
            await page.keyboard.press('PageDown');

            const source = await page.$$eval('a', (links) => {
                let strings = links.map((link) => link.toString());
                let filtered = strings.filter(
                    (link) => link.includes('redd.it') && link.length < 300,
                );
                return Array.from(new Set(filtered));
            });
            let name = imgLinks[link].split('/');
            name.pop();
            obj.push(name.pop());
            obj.push(source);
            result.push(obj);
        }

        await browser.close();
        console.log(result);

        return result;
    } catch (error) {
        console.log(error);
    }
};

export default redditCore;
