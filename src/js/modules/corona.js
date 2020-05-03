const socket = io(),
    indexNL = document.querySelector('#index_nl'),
    confirmedNL = document.querySelector('#confirmed_nl'),
    deadNL = document.querySelector('#dead_nl'),
    recoveredNL = document.querySelector('#recovered_nl'),
    coronaTop3 = document.querySelector('.top3_countries'),
    countryData = document.querySelector('.country-data'),
    selectBoxCountries = document.querySelector('#countries');

const renderCoronaData = (data, index) => {
    indexNL.textContent = `#${index}`;
    confirmedNL.textContent = data[0].confirmed;
    deadNL.textContent = data[0].dead;
    recoveredNL.textContent = data[0].recovered;
},

renderTop3 = (data) => {
    let indexTop3 = 1;
    removeAll('top3_countries');

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
},

renderCountryData = async (data, index) => {
    removeAll('country-data');

    const html = `
        ${data.map(item => {
        return `<div class="location">
            <h3><span id="location">${item.location}</span> <span>(</span><span id="index">#${index}</span><span>)</span></h3>
        </div>
        <div class="corona_data">
            <div class="confirmed">
                <p>Bevestigd</p>
                <p id="confirmed">${item.confirmed}</p>
            </div>
            <div class="dead">
                <p>Doden</p>
                <p id="dead">${item.dead}</p>
            </div>
            <div class="recovered">
                <p>Hersteld</p>
                <p id="recovered">${item.recovered}</p>
            </div>
        </div>`
    })}
    `;

    countryData.insertAdjacentHTML('beforeend', html);
};

if (selectBoxCountries) selectBoxCountries.addEventListener('change', (event) => {
    event.preventDefault();

    let selectedCountry = selectBoxCountries.value;
    socket.emit('get another country', selectedCountry);
});

socket.on('corona country data', (data, index) => {
    renderCoronaData(data, index);
});

socket.on('corona top 3', (data) => {
    renderTop3(data);
});

socket.on('get another country', (data, index) => {
    renderCountryData(data, index);
});
