const socket = io(),
    indexNL = document.querySelector('#index_nl'),
    confirmedNL = document.querySelector('#confirmed_nl'),
    deadNL = document.querySelector('#dead_nl'),
    recoveredNL = document.querySelector('#recovered_nl'),
    coronaTop3 = document.querySelector('.top3_countries');

renderCoronaData = (data, index) => {
    indexNL.textContent = `#${index}`;
    confirmedNL.textContent = data[0].confirmed;
    deadNL.textContent = data[0].dead;
    recoveredNL.textContent = data[0].recovered;
};

renderTop3 = (data) => {
    let indexTop3 = 1;
    remove('top3_countries');

    const html = `
        ${data.map(item => {
            return `<div class="country">
                <div class="location">
                    <p><span>#${indexTop3++}</span><span>${item.location}</span></p>
                    <p>${item.confirmed}</p>
                </div>
            </div>`
        }).join('')}
    `;

    coronaTop3.insertAdjacentHTML('beforeend', html);
};

remove = (elementId) => {
    const div = document.getElementById(elementId);

    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
};

socket.on('corona country data', (data, index) => {
    renderCoronaData(data, index);
});

socket.on('corona top 3', (data) => {
    renderTop3(data);
});
