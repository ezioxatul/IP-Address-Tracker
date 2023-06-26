const submitBtn = document.getElementById("submit-btn")
const userIp = document.querySelector(".user-ip")
const userLocation = document.querySelector(".user-location")
const userTimezone = document.querySelector(".user-timezone")
const userIsp = document.querySelector(".user-isp")


function clear(){
    document.getElementById("search-bar").value = "";
}



// Event Listener
submitBtn.addEventListener("click", function(){
    let inputValue = document.getElementById("search-bar").value;
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_8qHA7uC9YWKMtF7OpCzcL6Cb7e3kC&ipAddress=${inputValue}`)
.then(response => response.json())
.then(data => {

    userIp.innerHTML = data.ip
    userLocation.innerHTML = data.location.city + ", " + data.location.country
    userTimezone.innerHTML = "UTC " + data.location.timezone
    userIsp.innerHTML = data.isp
})

    clear();
})

