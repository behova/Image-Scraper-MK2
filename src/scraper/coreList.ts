import fourChanCore from './cores/fourchan/fourchan.js';
import redditCore from './cores/reddit/reddit.js';

export function getCore() {
    const coreList = [fourChanCore, redditCore];

    let number = Math.floor(Math.random() * coreList.length);
    return coreList[number];
}

export function getScrollAmount() {
    return Math.floor(Math.random() * (20 - 5) + 5);
}
