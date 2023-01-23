import puppeteer from 'puppeteer';
import getFourChanSource from './sourceList.js';

let fourChanCore = async function (scrollAmount: number, headless: boolean) {
    let source = getFourChanSource();
    try {
        //pupeteer init
        const browser = await puppeteer.launch({ headless: headless });
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
            let result: string[][] = [];
            for (let l in links) {
                let pair: string[] = [];
                let string = links[l].toString();
                //filter
                if (string.includes('.jpg') || string.includes('.png')) {
                    pair.push(links[l].innerText.toString());
                    pair.push(links[l].toString());

                    //if link text isn't blank
                    if (pair[0] != '') {
                        result.push(pair);
                    }
                }
            }
            return result;
        });

        await browser.close();

        return imgLinks;
    } catch (error) {
        console.log(error);
    }
};

export default fourChanCore;
