// const imgGlitch = require("img-glitch");
const Glitch = require("image-glitch");

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2FydG9taWtlIiwiYSI6IjA3ODMzYzc1NDQ5ZmZhMWY1ZjU4NGEwOGUyN2E3OWEzIn0.1AMo07FLn59Mtc3qSNp94g";
var start = [-74.5, 40];
var end = [74.5, 40];
angle = 0;
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/cartomike/cjfsjwn4x0hbz2sqc88wpnu7b",
  center: [-73.994958, 40.719022],
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
  window.document.body.appendChild(image.element);
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
let getRandomInt = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

map.on("load", function() {
  glitcher();
  setInterval(() => {
    newLng = getRandomInt(-74.014549, -73.972492);
    newLat = getRandomInt(40.704066, 40.761171);
    newBearing = getRandomInt(0, 360);
    map.setCenter([newLng, newLat]);
    map.setBearing(newBearing);

    document.getElementById("glitch")
      ? document.getElementById("glitch").remove()
      : console.log("start");
    // document.getElementById("glitch").remove()
    glitcher();
  }, 6000);
});
