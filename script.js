
const ipInput = document.querySelector("#ip-input")
const submitBtn = document.querySelector(".input-control")

const ipAdress = document.querySelector("#ip-adress")
const locationIp = document.querySelector("#location")
const timezoneIp = document.querySelector("#timezone")
const isp = document.querySelector("#isp")

let ipValue = sessionStorage.getItem("ip-value")

async function getLocation(ip) {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_fKGCrMmntGzZ0Fs0FIsmE98IGF1EV&ipAddress=${ip}`)

    const data = await response.json()

    ipAdress.innerHTML = data.ip
    locationIp.innerHTML = `${data.location.city} ${data.location.region} ${data.location.country}`
    timezoneIp.innerHTML = data.location.timezone
    isp.innerHTML = data.isp

    renderMap(data.location.lat, data.location.lng)

}

function renderMap(lat, lng) {
    let map = L.map('map', {
        zoomControl: false
    }).setView([lat, lng], 10);

    let myIcon = L.icon({
        iconUrl: './images/icon-location.svg'
    });

    L.marker([lat, lng], { icon: myIcon }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

if (sessionStorage.getItem("ip-value")) {
    getLocation(ipValue)

} else {
    getLocation("")
}

ipInput.addEventListener("change", (e) => {

    ipValue = e.target.value.replace(/[A-z]/g, "")

    ipInput.value = ipValue

    submitBtn.addEventListener("submit", () => {
        if (sessionStorage.getItem("ip-value")) {
            sessionStorage.clear()

        } else {
            if (ipValue !== "") {
                sessionStorage.setItem("ip-value", ipValue)

            }
        }
    })

})

submitBtn.addEventListener("submit", () => {
    if (sessionStorage.getItem("ip-value")) {
        sessionStorage.clear()
    }
})







