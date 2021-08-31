import {
  showUpButton
} from "./upButton.js";
import "./currentTemperature.js";
import {
  importWeather
} from "./weatherForecasts.js";

main();

function main() {
  importWeather();
  showUpButton();
}