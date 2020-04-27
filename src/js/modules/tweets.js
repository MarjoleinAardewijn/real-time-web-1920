const tweetsDiv = document.querySelector('.tweets-wrapper');

renderTweets = (data) => {

    const html = `
        ${data.statuses.map(item => {
        return `<div class="tweet"><p>${item.text}</p></div>`
    }).join(' ')}
    `;

    tweetsDiv.insertAdjacentHTML('beforeend', html);
};

renderTweet = (data) => {

    const html = `<div class="tweet"><p>${data.text}</p></div>`;

    tweetsDiv.insertAdjacentHTML('afterbegin', html);
};

socket.on('tweets', (tweets) => {
    renderTweets(tweets)
});

socket.on('new tweet', (tweet) => {
    renderTweet(tweet)
});