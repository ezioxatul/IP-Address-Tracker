const submitBtn = document.getElementById("submit-btn")
const userIp = document.querySelector(".user-ip")
const userLocation = document.querySelector(".user-location")
const userTimezone = document.querySelector(".user-timezone")
const userIsp = document.querySelector(".user-isp")
let input = document.getElementById("search-bar")
const map = L.map('map')
const marker = L.marker([0,0]).addTo(map)
const icon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 56]
})
marker.setIcon(icon)

function displayMap(longitude, latitude){
  map.setView([latitude, longitude], 13);
  marker.setLatLng([latitude, longitude]);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitBtn.click();
    }
  });


submitBtn.addEventListener("click", function(){
    let inputValue = input.value;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_8qHA7uC9YWKMtF7OpCzcL6Cb7e3kC&ipAddress=${inputValue}&domain=${inputValue}`)
    .then(response => response.json())
    .then(data => {

    userIp.innerHTML = data.ip
    userLocation.innerHTML = data.location.city + ", " + data.location.country
    userTimezone.innerHTML = "UTC " + data.location.timezone
    userIsp.innerHTML = data.isp
    const longitude = data.location.lng
    const latitude = data.location.lat
    displayMap(longitude, latitude)
})

})

window.onload = function() {
    let inputValue = input.value;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_0Rorquq8tCFZMn3hupacATeEoQDWZ&ipAddress=${inputValue}`)
    .then(response => response.json())
    .then(data => {

        userIp.innerHTML = data.ip;
        userLocation.innerHTML = data.location.city + ", " + data.location.country;
        userTimezone.innerHTML = "UTC " + data.location.timezone;
        userIsp.innerHTML = data.isp;
        const longitude = data.location.lng;
        const latitude = data.location.lat;
        displayMap(longitude, latitude); 
    })
};