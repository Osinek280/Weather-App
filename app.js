const searchInput = document.querySelector('input')
const label = document.querySelector('label')
const loopBtn = document.getElementById('loopButton')
const apikey = "a444dbbdd5d35e4e613b8b8828882d0f"

searchInput.addEventListener("input", (e) => {
    if(e.target.value !== ""){
        label.className = 'label'
    }else{
        label.className = 'label-active'
    }
})

const weatherSystem = () =>{
    const inputValue = searchInput.value
    if(inputValue === ''){
        const parent = document.querySelector('.modal-container')
        parent.innerHTML = ''
        return;
    }
    requestApi(inputValue)
}

function handleKeyDown(event) {
    if(event.key === 'Enter'){
    weatherSystem()
    }
}

searchInput.addEventListener('keydown', handleKeyDown)
loopBtn.addEventListener("click", weatherSystem)


function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetch(api)
        .then(response => response.json())
        .then(data => {
            let imageSrc = "image/clear.png"
            if(data.weather[0].id >= 801 && data.weather[0].id <= 804){
                imageSrc = "image/cloud.png"
            }else if(data.weather[0].id === 800){
                imageSrc = "image/clear.png"
            }else if(data.weather[0].id >= 701 && data.weather[0].id <= 781){
                imageSrc = "image/mist.png"
            }else if(data.weather[0].id >= 600 && data.weather[0].id <= 622){
                imageSrc = "image/snow.png"
            }else if(data.weather[0].id >= 500 && data.weather[0].id <= 531){
                imageSrc = "image/rain.png"
            }
            const renderPage = () => {
                const parent = document.querySelector('.modal-container')
                const weather = document.createElement("div")
                parent.innerHTML = ''
                weather.className = 'modal'
                weather.innerHTML = `
                <div class="image-box">
                    <img src="${imageSrc}" class="wetaherImage">
                </div>
                <div class="weather-info">
                    <h1>${data.main.temp.toFixed(0)}°C</h1>
                    <h2>${data.weather[0].description}</h2>
                </div>
                <div class="weather-description">
                    <div class="humidity">
                        <i class="fa-solid fa-water"></i>
                        <div class="text">
                            <span>${data.main.humidity}%</span>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div class="wind">
                        <i class="fa-solid fa-wind"></i>
                        <div class="text">
                            <span>${data.wind.speed.toFixed(1)} m/s</span>
                            <p>Wind speed</p>
                        </div>
                    </div>
                </div>
                `
                parent.appendChild(weather)
            }
            renderPage()           
        })
        .catch(error => {
            const parent = document.querySelector('.modal-container')
            const weather = document.createElement("div")
            parent.innerHTML = ''
            weather.className = 'modal'
            weather.innerHTML = `
            <div class="error-image-box">
                <img src="image/404.png" class="wetaherError">
            </div>
            <div class="error">
                <h1>No Found Location :/</h1>
            </div>
            `
            parent.appendChild(weather)
        });
}
