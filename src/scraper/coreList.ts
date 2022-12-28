import fourChanCore from './cores/fourchan/fourchan';
import redditCore from './cores/reddit/reddit';

const coreList = [fourChanCore, redditCore];

function getCore() {
    let number = Math.floor(Math.random() * coreList.length);
    return coreList[number];
}

export default getCore;
