import fourChanCore from './cores/fourchan/fourchan.js';
import redditCore from './cores/reddit/reddit.js';

const coreList = [fourChanCore, redditCore];

export function getCore() {
    let number = Math.floor(Math.random() * coreList.length);
    return coreList[number];
}

export function getScrollAmount() {
    return Math.floor(Math.random() * (20 - 5) + 5);
}
