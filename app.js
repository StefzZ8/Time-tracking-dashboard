const cards = document.querySelectorAll('.cards');
const links = document.querySelectorAll('.link');
const url = 'data.json';

// Function to update content based on the selected timeframe
function updateContent(timeframe) {

    // Loop through the cards and update data
    cards.forEach((card, index) => {
        const cardTitle = card.querySelector('.card-title');
        const currentHours = card.querySelector('.current-hours');
        const previousHours = card.querySelector('.previous-hours');
        const cardData = data[index];

        // Update card content based on the selected timeframe
        switch (timeframe) {
            case 'Daily':
                currentHours.textContent = cardData.timeframes.daily.current + 'hrs';
                previousHours.textContent = 'Yesterday - ' + cardData.timeframes.daily.previous + 'hrs';
                break;
            case 'Weekly':
                currentHours.textContent = cardData.timeframes.weekly.current + 'hrs';
                previousHours.textContent = 'Last Week - ' + cardData.timeframes.weekly.previous + 'hrs';
                break;
            case 'Monthly':
                currentHours.textContent = cardData.timeframes.monthly.current + 'hrs';
                previousHours.textContent = 'Last Month - ' + cardData.timeframes.monthly.previous + 'hrs';
                break;
        }
        cardTitle.textContent = cardData.title;
    });
}

fetch(url)
    .then((res) => res.json())
    .then((fetchedData) => {
        data = fetchedData; // store fetched data globally
        updateContent('Weekly'); // Initial display (can be 'Daily', 'Weekly', or 'Monthly')
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });

// Event listeners for links
links.forEach((link) => {
    link.addEventListener('click', function () {
        const selectedTimeframe = this.textContent; // 'Daily', 'Weekly', or 'Monthly'
        updateContent(selectedTimeframe);
    });
});