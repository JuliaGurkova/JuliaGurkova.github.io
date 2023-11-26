// Tabs
function openPart(evt, tabName) {
    var i, tabcontent, tablinks, tabpic,

        tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    tabpic = document.getElementById("pic");
    for (i = 0; i < tabpic.length; i++) {
        tabpic[i].style.backgroundImage = url()
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Tabs Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


// Calling API weather
const cities = {
    Hamburg: {
        latitude: 53.55,
        longitude: 9.99,
        timeZone: "Europe%2FBerlin",
    },

    Bremen: {
        latitude: 53.08,
        longitude: 8.80,
        timeZone: "Europe%2FBerlin",
    },

    Berlin: {
        latitude: 52.52,
        longitude: 13.40,
        timeZone: "Europe%2FBerlin",
    },

    Lübeck: {
        latitude: 53.86,
        longitude: 10.69,
        timeZone: "Europe%2FBerlin",
    },

    Kiel: {
        latitude: 54.32,
        longitude: 10.12,
        timeZone: "Europe%2FBerlin",
    },

    Schwerin: {
        latitude: 53.64,
        longitude: 11.40,
        timeZone: "Europe%2FBerlin",
    },

}

const getForecastUrlForCity = (
    {
        latitude,
        longitude,
        timeZone = "Europe%2FBerlin",
    }
) => `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&forecast_days=3&&timezone=${timeZone}`

const getDailyForecast = (data) => {
    const forecast = {}
    const dates = data.daily.time
    const maxTemperatures = data.daily.temperature_2m_max
    const minTemperatures = data.daily.temperature_2m_min
    const precipitationSums = data.daily.precipitation_sum
    const windSpeeds = data.daily.wind_speed_10m_max

    for (let i = 0; i < dates.length; i++) {
        forecast[dates[i]] = {
            maxTemperature: maxTemperatures[i],
            minTemperature: minTemperatures[i],
            precipitationSum: precipitationSums[i],
            windSpeed: windSpeeds[i],
        }
    }

    return forecast;

}

const displayData = (data) => {
    const dates = Object.keys(data)
    const dateElements = document.querySelectorAll('.date')
    const minTemperatureElements = document.querySelectorAll('.min-temperature')
    const maxTemperatureElements = document.querySelectorAll('.max-temperature')
    const precipitationSumElements = document.querySelectorAll('.precipitation')
    const windSpeedElements = document.querySelectorAll('.windSpeed')

    for (let i = 0; i < dateElements.length; i++) {
        const date = dates[i]
        const minTemperature = data[date].minTemperature
        const maxTemperature = data[date].maxTemperature
        const precipitationSum = data[date].precipitationSum
        const windSpeed = data[date].windSpeed

        dateElements[i].innerText = date
        minTemperatureElements[i].innerText = minTemperature
        maxTemperatureElements[i].innerText = maxTemperature
        precipitationSumElements[i].innerText = precipitationSum
        windSpeedElements[i].innerText = windSpeed
    }
}

const getCurrentCity = () => document.querySelector('#city').value
console.log(getCurrentCity)

const fetchHamburgData = () => fetch(getForecastUrlForCity(cities.Hamburg))
    .then(response => response.json())
    .then(getDailyForecast)
    .then(displayData)

const fetchBremenData = () => fetch(getForecastUrlForCity(cities.Bremen))
    .then(response => response.json())
    .then(getDailyForecast)
    .then(displayData)

    const fetchBerlinData = () => fetch(getForecastUrlForCity(cities.Berlin))
    .then(response => response.json())
    .then(getDailyForecast)
    .then(displayData)

    const fetchLübeckData = () => fetch(getForecastUrlForCity(cities.Lübeck))
    .then(response => response.json())
    .then(getDailyForecast)
    .then(displayData)

    const fetchKielData = () => fetch(getForecastUrlForCity(cities.Kiel))
    .then(response => response.json())
    .then(getDailyForecast)
    .then(displayData)

    const fetchSchwerinData = () => fetch(getForecastUrlForCity(cities.Schwerin))
    .then(response => response.json())
    .then(getDailyForecast)
    .then(displayData)




const fetchForecast = () => {
    switch (getCurrentCity()) {
        case "Hamburg":
            fetchHamburgData();
            break;
        case "Bremen":
            fetchBremenData();
            break;
        case "Berlin":
            fetchBerlinData();
            break;
        case "Lübeck":
            fetchLübeckData();
            break;
        case "Kiel":
            fetchKielData();
            break;
        case "Schwerin":
            fetchSchwerinData();
            break;
    }
}



// What to do

function toShow(id) {

    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


// Send photos Form

// Get data

function getDataForm(formNode) {
	return new FormData(formNode)
}

async function contuctSubmit(event) {
	event.preventDefault()
	const data = getDataForm(event.target)

	Loader()

	const { status, error } = await sendData(data)
	Loader()

	if (status === 200) {
		onSuccess(event.target)
        const currentUrl = window.location.protocol + '//' + window.location.host;
		location.replace(currentUrl + '../mainpage/index_forphoto.html')
		return { status: 200 }
	} else {
		onError(error)
	}
}

const photosForm = document.getElementById('sendphotoform')
photosForm.addEventListener('submit', contuctSubmit)


// Send data

async function sendData(data) {
	return await fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => response.json())
	.then(json => console.log(json))
}


// Sending...

function Loader() {
	const loader = document.getElementById('loader')
	loader.classList.toggle('hidden')
}

function onSuccess(formNode) {
	alert('Ihre Bewerbung wurde versendet!')
	formNode.classList.toggle('hidden')
}

// Error

function onError(error) {
	alert(error.message)
}

// Check Validity

function checkValidity(event) {
	const formNode = event.target.form
	const isValid = formNode.checkValidity()

	formNode.querySelector('button').disabled = !isValid
}

photosForm.addEventListener('input', checkValidity)











