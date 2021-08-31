//Ansvar att visa aktuell temperatur på varje sida 
import {
    getWeather
} from "./fetch.js";

importCurrentTemp()

function importCurrentTemp() {
    var weatherList = getWeather();
    weatherList.then(currentTemp); //Aktuell temperatur
}

//Funktion för aktuell temperatur
function currentTemp(weatherList) {
    let singleTemp = document.createElement("p");
    document.querySelector("header")
        .appendChild(singleTemp);
    //Letar efter indexposition i arrayen för aktuell temperatur för nästkommande timme
    var findTemp = weatherList[2].parameters;
    var currentIndex = findTemp.findIndex((x) => x.name === "t");
    singleTemp.append(
        "Under nästkommande timme är det " +
        weatherList[0].parameters[currentIndex].values[0] +
        " grader"
    );
}
