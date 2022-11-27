/* IMPORTS
------------------------*/

// Hash color generator
function colorGen() {
  let r = Math.floor(Math.random()*10);
  let g = Math.floor(Math.random()*10);
  let b = Math.floor(Math.random()*10);

  let rgb = `#${r}${g}${b}`;
  rgb.toString();

  return rgb;
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function easeInOutQuad(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

/* IMPORTS
------------------------*/

const can = document.getElementById("can");
const ctx = can.getContext("2d");
let globAng = 0;
let tempAng = 0;
let maxAng = 20;
let blobCol = colorGen();
let smalBlob = "#FFF"
let incr = 0.1;
let globLen = 240;
let changAng = randomRange(0.5, 1);
let changAng2 = randomRange(0.5, 1);

function fullsize() {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
} fullsize();

function drawFract(sX, sY, wid, len, color, ang) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = "#000";
  ctx.lineWidth = wid;
  ctx.translate(sX, sY);
  ctx.rotate(ang * Math.PI/180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len+len/4);
  ctx.stroke();
  
  len *= 0.75;

  if(len < 10) {
    ctx.restore();
    return;
  }

  if(len > 15) {
    drawFract(0, -len, wid, len, blobCol, ang + globAng/changAng);
    drawFract(0, -len, wid, len, blobCol, ang - globAng/changAng2);
  } else {
    drawFract(0, -len, wid, len, smalBlob, ang + globAng);
    drawFract(0, -len, wid, len, smalBlob, ang - globAng);
  }

  ctx.restore();
}

function loop() {

  if (globAng > maxAng || tempAng > maxAng) {
	  incr = -incr;
  } else if (globAng < 0 || tempAng < 0) {
	  blobCol = colorGen();
	  let rand = randomRange(100, 255);
	  smalBlob = `rgba(${rand}, ${rand}, ${rand}, ${0.3})`;
	  incr = -incr;
	  changAng = randomRange(2, 4);
	  changAng2 = randomRange(2, 4);
  }

  ctx.clearRect(0, 0, can.width, can.height);
  drawFract(can.width/2, can.height - 10, 2, globLen, blobCol, 0);
  window.requestAnimationFrame(loop);

  tempAng += incr;
  globAng = easeInOutQuad(tempAng, 0, 10, maxAng);

} window.requestAnimationFrame(loop);