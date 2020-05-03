const tweetsDiv = document.querySelector('#tweets'),
    selectBoxHashtags = document.querySelector('#hashtags'),
    hashtagTitle = document.querySelector('#hashtag-title');

const renderTweets = (data) => {
    const html = `
        ${data.map(item => {
            let string = item.text;
            let matches = string.match(/\bhttps?:\/\/\S+$/gi);
            let text = string.replace(/\bhttps?:\/\/\S+/gi, "");
            
            if (matches !== null) {
                return `<div class="tweet">
                    <div class="user">
                        <img src="account_circle-24px.svg" alt="Account Image">
                        <div class="user_info">
                            <p>${item.user.name}</p>
                            <p class="tweet-created_at">${item.created_at}</p>
                        </div>
                    </div>
                    <p class="tweet-content">${text}</p>
                    <div class="links">
                        <a href="${matches}" class="link btn-primary" target="_blank"><img src="launch-24px.svg" alt="Go To Original Tweet"></a>
                    </div>
                </div>`
            } else {
                return `<div class="tweet">
                    <div class="user">
                        <img src="account_circle-24px.svg" alt="Account Image">
                        <div class="user_info">
                            <p>${item.user.name}</p>
                            <p class="tweet-created_at">${item.created_at}</p>
                        </div>
                    </div>
                    <p class="tweet-content">${text}</p>
                </div>`
            }
        }).join(' ')}
    `;

    tweetsDiv.insertAdjacentHTML('beforeend', html);
},

renderTweet = (data) => {
    const string = data.text;
    let matches = string.match(/\bhttps?:\/\/\S+/gi);
    let text = data.text.replace(/\bhttps?:\/\/\S+/gi, "");
    let html = '';

    if(matches !== null) {
        html = `<div class="tweet">
                    <div class="user">
                        <img src="account_circle-24px.svg" alt="Account Image">
                        <div class="user_info">
                            <p>${data.user.name}</p>
                            <p class="tweet-created_at">${data.created_at}</p>
                        </div>
                    </div>
                    <p class="tweet-content">${text}</p>
                    <div class="links">
                        <a href="${matches}" class="link btn-primary" target="_blank"><img src="launch-24px.svg" alt="Go To Original Tweet"></a>
                    </div>
                </div>`;
    } else {
        html = `<div class="tweet">
                    <div class="user">
                        <img src="account_circle-24px.svg" alt="Account Image">
                        <div class="user_info">
                            <p>${data.user.name}</p>
                            <p class="tweet-created_at">${data.created_at}</p>
                        </div>
                    </div>
                    <p class="tweet-content">${data.text}</p>
                </div>`;
    }

    tweetsDiv.insertAdjacentHTML('afterbegin', html);
},

renderTweetsOtherHashtag = (data) => {
    removeAll('tweets');

    const html = `
        ${data.map(item => {
        let string = item.text;
        let matches = string.match(/\bhttps?:\/\/\S+$/gi);
        let text = string.replace(/\bhttps?:\/\/\S+/gi, "");

        if (matches !== null) {
            return `<div class="tweet">
                    <div class="user">
                        <img src="account_circle-24px.svg" alt="Account Image">
                        <div class="user_info">
                            <p>${item.user.name}</p>
                            <p class="tweet-created_at">${item.created_at}</p>
                        </div>
                    </div>
                    <p class="tweet-content">${text}</p>
                    <div class="links">
                        <a href="${matches}" class="link btn-primary" target="_blank"><img src="launch-24px.svg" alt="Go To Original Tweet"></a>
                    </div>
                </div>`
        } else {
            return `<div class="tweet">
                    <div class="user">
                        <img src="account_circle-24px.svg" alt="Account Image">
                        <div class="user_info">
                            <p>${item.user.name}</p>
                            <p class="tweet-created_at">${item.created_at}</p>
                        </div>
                    </div>
                    <p class="tweet-content">${text}</p>
                </div>`
        }
    }).join(' ')}
    `;

    tweetsDiv.insertAdjacentHTML('beforeend', html);
};

if (selectBoxHashtags) selectBoxHashtags.addEventListener('change', (event) => {
    event.preventDefault();

    let selectedHashtag = selectBoxHashtags.value;
    hashtagTitle.textContent = selectedHashtag;

    socket.emit('change hashtag', selectedHashtag);
});

socket.on('tweets', (tweets) => {
    renderTweets(tweets);
});

socket.on('new tweet', (tweet) => {
    renderTweet(tweet);
});

socket.on('change hashtag', (tweets) => {
    renderTweetsOtherHashtag(tweets);
});