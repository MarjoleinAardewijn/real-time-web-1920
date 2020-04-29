const tweetsDiv = document.querySelector('#tweets');

const renderTweets = (data) => {
    const html = `
        ${data.map(item => {
            let string = item.text;
            let matches = string.match(/\bhttps?:\/\/\S+$/gi);
            let text = string.replace(/\bhttps?:\/\/\S+/gi, "");
            
            if (matches !== null) {
                return `<div class="tweet">
                    <p>${item.created_at}</p>
                    <p>${item.user.name}</p>
                    <p>${text}</p>
                    <a href="${matches}" target="_blank">Bekijk originele tweet</a>
                </div>`
            } else {
                return `<div class="tweet">
                    <p>${item.created_at}</p
                    <p>${item.user.name}</p>
                    <p>${item.text}</p>
                </div>`
            }
        }).join(' ')}
    `;

    tweetsDiv.insertAdjacentHTML('beforeend', html);
},

renderTweet = (data) => {
    removeLastChild(tweetsDiv);

    const string = data.text;
    let matches = string.match(/\bhttps?:\/\/\S+/gi);
    let text = data.text.replace(/\bhttps?:\/\/\S+/gi, "");
    let html = '';

    if(matches !== null) {
        html = `<div class="tweet">
                    <p>${data.created_at}</p
                    <p>${data.user.name}</p>
                    <p>${text}</p>
                    <a href="${matches}" target="_blank">Bekijk originele tweet</a>
                </div>`;
    } else {
        html = `<div class="tweet">
                    <p>${data.created_at}</p
                    <p>${data.user.name}</p>
                    <p>${data.text}</p>
                </div>`;
    }

    tweetsDiv.insertAdjacentHTML('afterbegin', html);
},

removeLastChild = (element) => {
    const select = element;
    select.removeChild(select.lastChild);
};

socket.on('tweets', (tweets) => {
    renderTweets(tweets);
});

socket.on('new tweet', (tweet) => {
    renderTweet(tweet);
});