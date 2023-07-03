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

function getData(){
    let inputValue = input.value;
    fetch(`http://ip-api.com/json/${inputValue}`)
    .then(response => response.json())
    .then(data => {
      if (data.status === "fail"){
        alert("Please enter a valid IP address")
      }
      else{
    userIp.innerHTML = data.query
    userLocation.innerHTML = data.city + ", " + data.country
    userTimezone.innerHTML = data.timezone
    userIsp.innerHTML = data.org
    const longitude = data.lon
    const latitude = data.lat
    displayMap(longitude, latitude)
      }
})
}

function getDataAndVerify(){
    let inputValue = input.value;
    if (inputValue.match("[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}")){
        data = getData()
    }
    else{
        alert("Please enter a valid IP address")
    }
}


submitBtn.addEventListener("click", getDataAndVerify )

window.onload = getData();


