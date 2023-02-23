let btn = document.getElementById("btn");
let td = document.querySelectorAll("td");
let weatherCard = document.getElementById("weatherCard")
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

const fetchData = async (country) => {
  document.getElementById("city").innerHTML = country.toUpperCase();

  let url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${country}`;
  try {
    let response = await fetch(url, options);
    let json = await response.json();
    return showData(json);
  } catch (err) {
     console.log(err);
  }
};

const showData = async (data) => {
  try {
    let curr = data["current"];
    let loc = data["location"];
    // let air = curr["air_quality"]
    let showCard = "";
    showCard += `
    <div class="card-header text-info ">Country:
    <b><span id="country" class="text-warning">${loc.country} </span></b> Weather
    <p class="text-warning ">Region: <span class="text-danger">${loc.region}</span></p>
</div>
<div class="img container" id="img">
<img src=${curr.condition.icon} class="img-fluid img-responsive  img-lg" alt="icon">
</div>
<div class="card-body " id="cardBody">
    <h1 class="card-title  pb-4">Temperature</h1>
    <div class='row'>
    <div class='col-md-4'>
    <h3 class="card-title text-bg-info ">Celcius: <span id="temp_c">${curr.temp_c} °C</span></h3>
    <h4 class="card-title ">Fahrenheit : <span id="temp_f " class="text-danger">${curr.temp_f} °F</span></h5>
    </div>
    <div class='col-md-4'>

    <h3 class="card-title text-bg-danger">Humidity : <span id="humidity">${curr.humidity}</span></h3>
    <h4 class="card-title">Ultra violate : <span id="uv">${curr.uv}</span></h4>
    </div>
    <div class='col-md-4'>
    <h3 class="card-title text-bg-primary">Latitude : <span id="lat">${loc.lat}</span></h3>
    <h4 class="card-title">Longitude : <span id="lon">${loc.lon}</span></h4>
   </div>
   </div>
    <p class="card-text text-primary fs-4 mt-5" id="time"><b>${loc.localtime}</b></p>
</div>
    `;
    weatherCard.innerHTML = showCard;
    let arr = [
      "temp_c",
      "temp_f",
      "feelslike_c",
      "feelslike_f",
      "uv",
      "humidity",
      "wind_kph",
      "cloud",
    ];

    // Displaying weather info. in table.
    Array.from(td).map((e, index) => (e.innerHTML = curr[`${arr[index]}`]));

  } catch (err) {
    let showError = "";

    showError += `<p class="text-danger fs-4">Something went wrong.</p>`;
    weatherCard.innerHTML = showError;
  }
};

// Search country to check weather.

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let val = document.getElementById("search");
  fetchData(val.value);
});

fetchData("India");
