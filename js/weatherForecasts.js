import {
  getWeather
} from "./fetch.js";

//Funktion för att importera väderprognos-arrayen till de olika funktionerna som avser klockslagen 
export function importWeather() {
  var weatherList = getWeather();
  weatherList.then(morningForecast); //Idag, klockan 6
  weatherList.then(noonForecast); //Idag, klockan 12
  weatherList.then(eveningForecast); //Idag, klockan 18
  weatherList.then(tomorrowMorningForecast); //Imorgon, klockan 6
  weatherList.then(tomorrowNoonForecast); //Imorgon, klockan 12
  weatherList.then(tomorrowEveningForecast); //Imorgon, klockan 18
}

//Globala variablar
var today = new Date();
today.setDate(today.getDate());
today.setHours(today.getHours() + 2)
var strDateToday = today.toJSON();
//Vill enbart få ut dagens datum så skriver ut var extraktionen ska börja och sluta
var dateToday = strDateToday.substr(0, 10);
let h2Weather = document.createElement("h2");
h2Weather.innerHTML = "Väder";
let h3Today = document.createElement("h3");
h3Today.innerHTML = "Idag den " + dateToday;
let tableToday = document.createElement("table");
tableToday.classList.add("tableweather");
let thead = document.createElement("thead");
tableToday.append(thead);
let tr = document.createElement("tr");
thead.append(tr);
let thTime = document.createElement("th");
tr.append(thTime);
thTime.innerHTML = "KL";
let thTemp = document.createElement("th");
tr.append(thTemp);
thTemp.innerHTML = "Temp";
let thWind = document.createElement("th");
tr.append(thWind);
thWind.innerHTML = "Vind";
let thSky = document.createElement("th");
tr.append(thSky);
thSky.innerHTML = "Himmel";
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(tomorrow.getHours() + 2)
var strDateTomorrow = tomorrow.toJSON();
//Är bara intresserad av morgonsdagens datum
var dateTomorrow = strDateTomorrow.substr(0, 10);
let h3Tomorrow = document.createElement("h3");
h3Tomorrow.innerHTML = "Imorgon den " + dateTomorrow;
//Skapar morgondagens tabell
let tableTomorrow = document.createElement("table");
tableTomorrow.classList.add("tableweather");
let theadTomorrow = document.createElement("thead");
tableTomorrow.append(theadTomorrow);
let trTomorrow = document.createElement("tr");
theadTomorrow.append(trTomorrow);
let thTimeTomorrow = document.createElement("th");
trTomorrow.append(thTimeTomorrow);
thTimeTomorrow.innerHTML = "KL";
let thTempTomorrow = document.createElement("th");
trTomorrow.append(thTempTomorrow);
thTempTomorrow.innerHTML = "Temp";
let thWindTomorrow = document.createElement("th");
trTomorrow.append(thWindTomorrow);
thWindTomorrow.innerHTML = "Vind";
let thSkyTomorrow = document.createElement("th");
trTomorrow.append(thSkyTomorrow);
thSkyTomorrow.innerHTML = "Himmel";
let trTomorrowMorning = document.createElement("tr");
tableTomorrow.append(trTomorrowMorning);
let tdtomorrowMorning = document.createElement("td");
trTomorrowMorning.append(tdtomorrowMorning);
tdtomorrowMorning.innerHTML = "6";
let trTomorrowNoon = document.createElement("tr");
tableTomorrow.append(trTomorrowNoon);
let tdTomorrowNoon = document.createElement("td");
trTomorrowNoon.append(tdTomorrowNoon);
tdTomorrowNoon.innerHTML = "12";
let trTomorrowEvening = document.createElement("tr");
tableTomorrow.append(trTomorrowEvening);
let tdtomorrowEvening = document.createElement("td");
trTomorrowEvening.append(tdtomorrowEvening);
tdtomorrowEvening.innerHTML = "18";
//För att förhindra att det blir null på andra sidor som inte har div #smhi-widget
if (document.querySelector("#smhi-widget") != null) {
  document.querySelector("#smhi-widget").append(h2Weather);
  document.querySelector("#smhi-widget").append(h3Today);
  document.querySelector("#smhi-widget").append(tableToday);
  document.querySelector("#smhi-widget").append(h3Tomorrow);
  document.querySelector("#smhi-widget").append(tableTomorrow);
};

//En funktion som skapar upp en tabellrad i tabellen med väderdata för imorgon, kl 6.
function morningForecast(weatherList) {
  let trMorning = document.createElement("tr");
  tableToday.append(trMorning);
  let tdMorning = document.createElement("td");
  trMorning.append(tdMorning);
  let tdTempMorning = document.createElement("td");
  //Kontrollerar om SMHI:s API har tillgänglig väderprognos för klockslaget, och ifall den inte finns så skrivs det ut att väderprognos saknas
  if (
    typeof weatherList.find((obj) =>
      obj.validTime.includes(dateToday + "T06")
    ) == "undefined"
  ) {
    tdMorning.innerHTML = "6, väderprognos saknas!";
  } else {
    tdMorning.innerHTML = "6";
    var weatherMorning = weatherList.find((obj) =>
      obj.validTime.includes(dateToday + "T06")
    );
    //Letar efter aktuell indexposition i arrayen för temperatur och vind
    var tempMorningIndex = weatherMorning.parameters.findIndex(
      (x) => x.name === "t"
    );
    var wdMorningIndex = weatherMorning.parameters.findIndex(
      (x) => x.name === "wd"
    );
    var wsMorningIndex = weatherMorning.parameters.findIndex(
      (x) => x.name === "ws"
    );
    tdTempMorning.innerHTML =
      weatherMorning.parameters[tempMorningIndex].values[0] + "°C";
    trMorning.append(tdTempMorning);
    let tdWindMorning = document.createElement("td");
    trMorning.append(tdWindMorning);
    //Tillskrivandet av pil med vindriktning i cellen
    let divWindMorning = document.createElement("div");
    tdWindMorning.append(divWindMorning);
    let divWdMorning = document.createElement("div");
    divWindMorning.append(divWdMorning);
    divWdMorning.innerHTML = "↓";
    let divWsMorning = document.createElement("div");
    divWdMorning.style.setProperty(
      "transform",
      "rotate(" + weatherMorning.parameters[wdMorningIndex].values[0] + "deg)"
    );
    divWdMorning.style.setProperty("position", "absolute");
    divWsMorning.style.setProperty("margin-left", "20px");
    divWsMorning.innerHTML =
      "(" + weatherMorning.parameters[wsMorningIndex].values[0] + "m/s)";
    divWindMorning.append(divWsMorning);
    let tdSkyMorning = document.createElement("td");
    trMorning.append(tdSkyMorning);
    let weatherSituation = weatherMorning.parameters[18].values[0];
    printWeatherSituation(weatherSituation, tdSkyMorning)
  }
}

function noonForecast(weatherList) {
  let trNoon = document.createElement("tr");
  tableToday.append(trNoon);
  let tdNoon = document.createElement("td");
  trNoon.append(tdNoon);
  let tdTempNoon = document.createElement("td");
  if (
    typeof weatherList.find((obj) =>
      obj.validTime.includes(dateToday + "T12")
    ) == "undefined"
  ) {
    tdNoon.innerHTML = "12, väderprognos saknas!";
  } else {
    tdNoon.innerHTML = "12";
    var weatherNoon = weatherList.find((obj) =>
      obj.validTime.includes(dateToday + "T12")
    );
    var tempNoonIndex = weatherNoon.parameters.findIndex((x) => x.name === "t");
    var wdNoonIndex = weatherNoon.parameters.findIndex((x) => x.name === "wd");
    var wsNoonIndex = weatherNoon.parameters.findIndex((x) => x.name === "ws");
    trNoon.append(tdTempNoon);
    tdTempNoon.innerHTML =
      weatherNoon.parameters[tempNoonIndex].values[0] + "°C";
    let tdWindNoon = document.createElement("td");
    trNoon.append(tdWindNoon);
    let divWindNoon = document.createElement("div");
    tdWindNoon.append(divWindNoon);
    let divWdNoon = document.createElement("div");
    divWindNoon.append(divWdNoon);
    divWdNoon.innerHTML = "↓";
    let divWsNoon = document.createElement("div");
    divWdNoon.style.setProperty(
      "transform",
      "rotate(" + weatherNoon.parameters[wdNoonIndex].values[0] + "deg)"
    );
    divWdNoon.style.setProperty("position", "absolute");
    divWsNoon.style.setProperty("margin-left", "20px");
    divWsNoon.innerHTML =
      "(" + weatherNoon.parameters[wsNoonIndex].values[0] + "m/s)";
    divWindNoon.append(divWsNoon);

    let tdSkyNoon = document.createElement("td");
    trNoon.append(tdSkyNoon);
    let weatherSituation = weatherNoon.parameters[18].values[0];
    printWeatherSituation(weatherSituation, tdSkyNoon)
  }
}

function eveningForecast(weatherList) {
  let trEvening = document.createElement("tr");
  tableToday.append(trEvening);
  let tdEvening = document.createElement("td");
  trEvening.append(tdEvening);
  let tdTempEvening = document.createElement("td");
  if (
    typeof weatherList.find((obj) =>
      obj.validTime.includes(dateToday + "T18")
    ) == "undefined"
  ) {
    tdEvening.innerHTML = "18, väderprognos saknas!";
  } else {
    tdEvening.innerHTML = "18";
    var weatherEvening = weatherList.find((obj) =>
      obj.validTime.includes(dateToday + "T18")
    );
    var tempEveningIndex = weatherEvening.parameters.findIndex(
      (x) => x.name === "t"
    );
    var wdEveningIndex = weatherEvening.parameters.findIndex(
      (x) => x.name === "wd"
    );
    var wsEveningIndex = weatherEvening.parameters.findIndex(
      (x) => x.name === "ws"
    );
    tdTempEvening.innerHTML =
      weatherEvening.parameters[tempEveningIndex].values[0] + "°C";
    trEvening.append(tdTempEvening);
    let tdWindEvening = document.createElement("td");
    trEvening.append(tdWindEvening);
    let divWindEvening = document.createElement("div");
    tdWindEvening.append(divWindEvening);
    let divWdEvening = document.createElement("div");
    divWindEvening.append(divWdEvening);
    divWdEvening.innerHTML = "↓";
    let divWsEvening = document.createElement("div");
    divWdEvening.style.setProperty(
      "transform",
      "rotate(" + weatherEvening.parameters[wdEveningIndex].values[0] + "deg)"
    );
    divWdEvening.style.setProperty("position", "absolute");
    divWsEvening.style.setProperty("margin-left", "20px");
    divWsEvening.innerHTML =
      "(" + weatherEvening.parameters[wsEveningIndex].values[0] + "m/s)";
    divWindEvening.append(divWsEvening);
    let tdSkyEvening = document.createElement("td");
    trEvening.append(tdSkyEvening);
    let weatherSituation = weatherEvening.parameters[18].values[0];
    printWeatherSituation(weatherSituation, tdSkyEvening)
  }
}

function tomorrowMorningForecast(weatherList) {
  //Vill åt morgondagens väder för olika tider
  var weatherTomorrowMorning = weatherList.find((obj) =>
    obj.validTime.includes(dateTomorrow + "T06")
  );
  var tempTomorrowMorningIndex = weatherTomorrowMorning.parameters.findIndex(
    (x) => x.name === "t"
  );
  var wdTomorrowMorningIndex = weatherTomorrowMorning.parameters.findIndex(
    (x) => x.name === "wd"
  );
  var wsTomorrowMorningIndex = weatherTomorrowMorning.parameters.findIndex(
    (x) => x.name === "ws"
  );
  let tdTempTomorrowMorning = document.createElement("td");
  trTomorrowMorning.append(tdTempTomorrowMorning);
  tdTempTomorrowMorning.innerHTML =
    weatherTomorrowMorning.parameters[tempTomorrowMorningIndex].values[0] +
    "°C";
  //Hämta vindstyrkan och skriv ut i tabellen
  let tdWindTomorrowMorning = document.createElement("td");
  trTomorrowMorning.append(tdWindTomorrowMorning);
  let divWindTomorrowMorning = document.createElement("div");
  tdWindTomorrowMorning.append(divWindTomorrowMorning);
  let divWdTomorrowMorning = document.createElement("div");
  divWindTomorrowMorning.append(divWdTomorrowMorning);
  divWdTomorrowMorning.innerHTML = "↓";
  let divWsTomorrowMorning = document.createElement("div");
  divWdTomorrowMorning.style.setProperty(
    "transform",
    "rotate(" +
    weatherTomorrowMorning.parameters[wdTomorrowMorningIndex].values[0] +
    "deg)"
  );
  divWdTomorrowMorning.style.setProperty("position", "absolute");
  divWsTomorrowMorning.style.setProperty("margin-left", "20px");
  divWsTomorrowMorning.innerHTML =
    "(" +
    weatherTomorrowMorning.parameters[wsTomorrowMorningIndex].values[0] +
    "m/s)";
  divWindTomorrowMorning.append(divWsTomorrowMorning);
  let tdSkyTomorrowMorning = document.createElement("td");
  trTomorrowMorning.append(tdSkyTomorrowMorning);
  let weatherSituation = weatherTomorrowMorning.parameters[18].values[0];
  printWeatherSituation(weatherSituation, tdSkyTomorrowMorning)
}

function tomorrowNoonForecast(weatherList) {
  var weatherTomorrowNoon = weatherList.find((obj) =>
    obj.validTime.includes(dateTomorrow + "T12")
  );
  var tempTomorrowNoonIndex = weatherTomorrowNoon.parameters.findIndex(
    (x) => x.name === "t"
  );
  var wdTomorrowNoonIndex = weatherTomorrowNoon.parameters.findIndex(
    (x) => x.name === "wd"
  );
  var wsTomorrowNoonIndex = weatherTomorrowNoon.parameters.findIndex(
    (x) => x.name === "ws"
  );
  let tdTempTomorrowNoon = document.createElement("td");
  trTomorrowNoon.append(tdTempTomorrowNoon);
  tdTempTomorrowNoon.innerHTML =
    weatherTomorrowNoon.parameters[tempTomorrowNoonIndex].values[0] + "°C";
  let tdWindTomorrowNoon = document.createElement("td");
  trTomorrowNoon.append(tdWindTomorrowNoon);
  let divWindTomorrowNoon = document.createElement("div");
  tdWindTomorrowNoon.append(divWindTomorrowNoon);
  let divWdTomorrowNoon = document.createElement("div");
  divWindTomorrowNoon.append(divWdTomorrowNoon);
  divWdTomorrowNoon.innerHTML = "↓";
  let divWsTomorrowNoon = document.createElement("div");
  divWdTomorrowNoon.style.setProperty(
    "transform",
    "rotate(" +
    weatherTomorrowNoon.parameters[wdTomorrowNoonIndex].values[0] +
    "deg)"
  );
  divWdTomorrowNoon.style.setProperty("position", "absolute");
  divWsTomorrowNoon.style.setProperty("margin-left", "20px");
  divWsTomorrowNoon.innerHTML =
    "(" +
    weatherTomorrowNoon.parameters[wsTomorrowNoonIndex].values[0] +
    "m/s)";
  divWindTomorrowNoon.append(divWsTomorrowNoon);
  let tdSkyTomorrowNoon = document.createElement("td");
  trTomorrowNoon.append(tdSkyTomorrowNoon);
  let weatherSituation = weatherTomorrowNoon.parameters[18].values[0];
  printWeatherSituation(weatherSituation, tdSkyTomorrowNoon)
}

function tomorrowEveningForecast(weatherList) {
  var weatherTomorrowEvening = weatherList.find((obj) =>
    obj.validTime.includes(dateTomorrow + "T18")
  );
  var tempTommorowEveningIndex = weatherTomorrowEvening.parameters.findIndex(
    (x) => x.name === "t"
  );
  var wdTomorrowEveningIndex = weatherTomorrowEvening.parameters.findIndex(
    (x) => x.name === "wd"
  );
  var wsTomorrowEveningIndex = weatherTomorrowEvening.parameters.findIndex(
    (x) => x.name === "ws"
  );
  let tdTempTomorrowEvening = document.createElement("td");
  trTomorrowEvening.append(tdTempTomorrowEvening);
  tdTempTomorrowEvening.innerHTML =
    weatherTomorrowEvening.parameters[tempTommorowEveningIndex].values[0] +
    "°C";
  let tdWindTomorrowEvening = document.createElement("td");
  trTomorrowEvening.append(tdWindTomorrowEvening);
  let divWindTomorrowEvening = document.createElement("div");
  tdWindTomorrowEvening.append(divWindTomorrowEvening);
  let divWdTomorrowEvening = document.createElement("div");
  divWindTomorrowEvening.append(divWdTomorrowEvening);
  divWdTomorrowEvening.innerHTML = "↓";
  let divWsTomorrowEvening = document.createElement("div");
  divWdTomorrowEvening.style.setProperty(
    "transform",
    "rotate(" +
    weatherTomorrowEvening.parameters[wdTomorrowEveningIndex].values[0] +
    "deg)"
  );
  divWdTomorrowEvening.style.setProperty("position", "absolute");
  divWsTomorrowEvening.style.setProperty("margin-left", "20px");
  divWsTomorrowEvening.innerHTML =
    "(" +
    weatherTomorrowEvening.parameters[wsTomorrowEveningIndex].values[0] +
    "m/s)";
  divWindTomorrowEvening.append(divWsTomorrowEvening);
  let tdSkyTomorrowEvening = document.createElement("td");
  trTomorrowEvening.append(tdSkyTomorrowEvening);
  let weatherSituation = weatherTomorrowEvening.parameters[18].values[0];
  printWeatherSituation(weatherSituation, tdSkyTomorrowEvening)
}

//En funktion för en switch-sats för att avgöra hur himmelen blir för alla klockslag, hämtad från https://www.smhi.se/kunskapsbanken/meteorologi/vad-betyder-smhis-vadersymboler-1.12109?
function printWeatherSituation(weatherSituation, element) {
  switch (weatherSituation) {
    case 1:
      element.innerHTML = "Klart";
      break;
    case 2:
      element.innerHTML = "Lätt molnighet";
      break;
    case 3:
      element.innerHTML = "Halvklart";
      break;
    case 4:
      element.innerHTML = "Molnigt";
      break;
    case 5:
      element.innerHTML = "Mycket moln";
      break;
    case 6:
      element.innerHTML = "Mulet";
      break;
    case 7:
      element.innerHTML = "Dimma";
      break;
    case 8:
      element.innerHTML = "Lätt regnskur";
      break;
    case 9:
      element.innerHTML = "Regnskur";
      break;
    case 10:
      element.innerHTML = "Kraftig regnskur";
      break;
    case 11:
      element.innerHTML = "Åskskur";
      break;
    case 12:
      element.innerHTML = "Lätt by av regn och snö";
      break;
    case 13:
      element.innerHTML = "By av regn och snö";
      break;
    case 14:
      element.innerHTML = "Kraftig by av regn och snö";
      break;
    case 15:
      element.innerHTML = "Lätt snöby";
      break;
    case 16:
      element.innerHTML = "Snöby";
      break;
    case 17:
      element.innerHTML = "Kraftig snöby";
      break;
    case 18:
      element.innerHTML = "Lätt regn";
      break;
    case 19:
      element.innerHTML = "Regn";
      break;
    case 20:
      element.innerHTML = "Kraftigt regn";
      break;
    case 21:
      element.innerHTML = "Åska";
      break;
    case 22:
      element.innerHTML = "Lätt snöblandat regn";
      break;
    case 23:
      element.innerHTML = "Snöblandat regn";
      break;
    case 24:
      element.innerHTML = "Kraftigt snöblandat regn";
      break;
    case 25:
      element.innerHTML = "Lätt snöfall";
      break;
    case 26:
      element.innerHTML = "Snöfall";
      break;
    case 27:
      element.innerHTML = "Ymnigt snöfall";
    default:
  }
}
