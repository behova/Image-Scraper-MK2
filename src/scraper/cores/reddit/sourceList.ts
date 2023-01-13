const redditSources = [
    'https://www.reddit.com/r/wallpapers/',
    'https://www.reddit.com/r/wallpaper/',
    'https://www.reddit.com/r/wallpaperdump/',
];

function getRedditSource() {
    let number = Math.floor(Math.random() * redditSources.length);
    return redditSources[number];
}

export default getRedditSource;
