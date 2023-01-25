let apiKey = "3bfd7abbb87e64e6f756c29dcd4cdfbf";
var currentCity = "";
var lastCity = "";

var getCurrentConditions = (event) => {
    // Obtain city name from the search box
    let city = $('#searchCity').val();
    currentCity= $('#searchCity').val();
    let dataSearch = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + apiKey;
    fetch(dataSearch)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })
    .then((response) => {
        saveSearch(city);
    })
}

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

$('#clearStorage').on("click", (event) => {
    localStorage.clear();
});
