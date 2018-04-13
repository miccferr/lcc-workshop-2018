// const imgGlitch = require("img-glitch");
const Glitch = require("image-glitch");

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FydG9taWtlIiwiYSI6IjA3ODMzYzc1NDQ5ZmZhMWY1ZjU4NGEwOGUyN2E3OWEzIn0.1AMo07FLn59Mtc3qSNp94g";

var start = [-0.378342, 51.358062];
var end = [0.140762, 51.597121];
angle = 0;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/cartomike/cjfsjwn4x0hbz2sqc88wpnu7b",
  center: [-0.069695, 51.494049],
  zoom: 12,
  pitch: 60,
  bearing: 0,
  preserveDrawingBuffer: true,
  interactive: false,
});

var isAtStart = true;

/**
 * takes a screenshot of current canvas image
 * return  glitch version of it
 * and keeps glitching it
 */
let glitcher = () => {
  var img = new Image();
  var mapCanvas = document.querySelector(".mapboxgl-canvas");
  img.src = mapCanvas.toDataURL();
  const image = new Glitch(img, 500, 3000, 250);

  image.element.style.zIndex = 999999;
  image.element.style.position = "absolute";
  image.element.style.height = "100%";
  image.element.id = "glitch";
  document.getElementById("map").appendChild(image.element);
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
let getRandomInt = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

/**
 *
 * @param {int} val
 * changes map bearing
 */
const rotateMap = val => {
  map.setBearing(val);
};

map.on("load", function() {
  let tmpBearing = 0;
  let rotateInterval = setInterval(function() {
    tmpBearing += 0.05;
    rotateMap(tmpBearing);
  }, 10);
  // glitch on first location
  setTimeout(() => glitcher(), 4000);
  // start random locations
  setInterval(() => {
    tmpBearing = 0;
    newLng = getRandomInt(-0.378342, 0.140762);
    newLat = getRandomInt(51.358062, 51.597121);

    map.setCenter([newLng, newLat]);
    document.getElementById("glitch")
      ? document.getElementById("glitch").remove()
      : console.log("start");
    setTimeout(() => glitcher(), 8000);
  }, 10000);
});
