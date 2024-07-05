'user strict'
// search input
let searchInput = document.getElementById('search');
let searchInputBtn = document.getElementById('input')
// today data
let todayName = document.getElementById('todayDateDayName');
let todayMonth = document.getElementById('todayDateMonth');
let todayNumber = document.getElementById('todayDateDayNumber');
let todayLocation = document.getElementById('todayLocation');
let todayTemp = document.getElementById('todayTemp');
let todayCondationImg = document.getElementById('todayConditionImage');
let todayCondationText = document.getElementById('todayConditionText');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDirection = document.getElementById('windDirection');
let date = new Date();
// console.log(todayName,todayNumber,todayMonth,todayLocation,todayCondationImg,todayCondationText,humidity,wind,windDirection);

// nextday data
let nextdayName = document.getElementsByClassName('nextDayName');
let nextMaxTemp = document.getElementsByClassName('nextMaxTemp');
let nextMinTemp = document.getElementsByClassName('nextMinTemp');
let nextConditionImg = document.getElementsByClassName('nextConditionImage');
let nextDayConditionText = document.getElementsByClassName('nextDayConditionText');
// console.log(nextConditionImg,nextDayConditionText,nextMaxTemp,nextMinTemp,nextdayName,searchInput);

// fetching
async function getWeatherData(city){
    try {
        let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6364b129fddd4714bba135613240407&q=${city}&days=3` );
        // console.log(weatherResponse);
        if(!weatherResponse.ok){
            throw new Error('Failed To Get data'+ weatherResponse.status);
        }
            // console.log(weatherResponse);
        let weatherData = await weatherResponse.json()
        // console.log(weatherData);
        return weatherData;
    }
    catch(err){
        console.log(err);
    }
}
// display today data
function displayTodayData(data) {
    let todaydata ='';
    todaydata += `
          <div class="card-header d-flex justify-content-between" id="todayDate">
           <p id="todayDateDayName">${ date.toLocaleDateString('en-US' , {weekday:'long'})}</p>
           <span>
            <span id="todayDateDayNumber">${date.getDate()}</span>
            <span id="todayDateMonth">${date.toLocaleDateString('en-US' , {month:'long'})}</span>
           </span>
          </div>
          <div class="card-content py-4 px-2" id="today">
            <div class="location mb-4 fs-4 ps-2" id="todayLocation">${data.location.name}</div>
              <div id="fs6rem" class="overflow-hidden fw-bolder text-white ps-3">
                <span>
                  <span id="todayTemp">${data.current.temp_c}</span>
                  <span><sup>o</sup>C</span>
                </span>
              </div>
              <div class="card-icon">
                <img id="todayConditionImage" src="${data.current.condition.icon}" alt="" width="90">
              </div>

            </div>
            <div class="custom fs-4 ps-2" id="todayConditionText">${data.current.condition.text}</div>
            <div class="item-footer pb-3">
              <span id="humidity" class="pe-2"><i class="p-2 fa-solid fa-umbrella"></i>${data.current.humidity+'%'}</span>
              <span id="wind" class="pe-2"><i class="p-2 fa-solid fa-wind"></i>${data.current.wind_kph+"kmh"}</span>
              <span id="windDirection" class="pe-2"><i class="p-2 fa-regular fa-compass"></i>${data.current.wind_dir}</span>
            </div>`
            // console.log(todaydata);
    document.getElementById('todayCard').innerHTML = todaydata
}


// display next days data
function displayNextDaysData(data){
    let forecastData = data.forecast.forecastday;
    let i;
    for( i = 0; i < 2 ; i++){
        let nextdaydata = '';
        let nextDate = new Date (forecastData[i+1].date)
        nextdaydata += `          <div class="card-header d-flex justify-content-center align-items-center" id="">
           <p class="nextDayName">${nextDate.toLocaleDateString('en-US' , {weekday:'long'})}</p>
          </div>
          <div class="card-icon">
            <img class="nextConditionImage pt-4" src="${forecastData[i+1].day.condition.icon}" alt="" width="90">
          </div>
          <div class="card-content py-4 px-2" id="today">
              <div id="fs3rem" class="fw-bolder text-white ps-3 d-flex align-items-center flex-column">
                <span class="d-block">
                  <span class="nextMaxTemp">${forecastData[i+1].day.maxtemp_c}</span>
                  <span><sup>o</sup>C</span>
                </span>
                <span class="fs-5">
                  <span class="nextMinTemp">${forecastData[i+1].day.mintemp_c}</span>
                  <span><sup>o</sup>C</span>
                </span>
              </div>
            </div>
            <div class="nextDayConditionText custom fs-4 ps-2 pb-3" >${forecastData[i+1].day.condition.text}</div>`
            Array.from(document.getElementsByClassName("nextdatedata"))[i].innerHTML = nextdaydata;
    }
  
}

async function startMyAPP(defaultCity = 'cairo'){
    let weatherData =await getWeatherData(defaultCity);
    if(!weatherData.error){
        displayTodayData(weatherData);
        displayNextDaysData(weatherData);
    }
    else{
        throw new Error('Failed');    
    }
    // console.log(weatherData);

}
startMyAPP();

// searchInputBtn.addEventListener('click' , function(){
//     startMyAPP(searchInput.value);
// })
searchInput.addEventListener('input' , function(){
  const countryList = [
    "egypt",'alexandria','aswan','cairo','london',
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North",
    "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
    "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
    "Zambia", "Zimbabwe"
  ];
  let searchForCountry = searchInput.value;
  // console.log(searchForCountry);
  let indexCountry = countryList.indexOf(searchForCountry) ;
  // console.log(indexCountry);
  if(indexCountry === -1){
    document.getElementById('message').classList.replace('d-none' , 'd-block')
  }
  else{
    startMyAPP(searchInput.value);
    document.getElementById('message').classList.replace('d-block' , 'd-none')
  }
})











