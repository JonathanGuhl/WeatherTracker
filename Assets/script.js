let owmAPI = "3bfd7abbb87e64e6f756c29dcd4cdfbf";
var currentCity = "";
var lastCity = "";

// Obtains city name from the search box
var getCurrentConditions = (event) => {
    let city = $('#searchCity').val();
    currentCity= $('#searchCity').val();
    let dataSearch = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
    fetch(dataSearch)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        let getFiveDayForecast = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
        fetch(getFiveDayForecast)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
    })
    .catch(error => {
        console.error(error);
    })
    .then((response) => {
        saveSearch(city);
    })
}
// Adds searched citites to local storage
var saveSearch = (newCity) => {
    let cityExists = false;
// Check if City exists in local storage
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] === newCity) {
            cityExists = true;
            break;
        }
    }
// Save to localStorage if city is new
    if (cityExists === false) {
        localStorage.setItem('cities' + localStorage.length, newCity);
    }
}


// Event listener for search button 
$('#searchButton').on("click", (event) => {
event.preventDefault();
currentCity = $('#searchCity').val();
getCurrentConditions(event);
});
// Event listener for clear storage button
$('#clearStorage').on("click", (event) => {
    localStorage.clear();
});

