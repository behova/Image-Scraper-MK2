function getFourChanSource() {
    const fourChanSources = [
        'https://boards.4chan.org/wg/2',
        'https://boards.4channel.org/w/',
    ];

    let number = Math.floor(Math.random() * fourChanSources.length);
    return fourChanSources[number];
}

export default getFourChanSource;
