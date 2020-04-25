/*

variables

constants are block-scoped, their values can't be changed through reassignment, and they can't be redeclared
the let statement declares a block scope local variable, optionally initializing it to a value

*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let numberOfCircles = 10;
let arrayOfCircles = [];
let animationTime = 30;
// animate objects
var intervalId = setInterval(renderArrayOfCircles, animationTime);

/*

functions

*/

function minMaxRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

function pickRandomColor() {
	var colors = ["blue", "magenta", "blueviolet", "mediumaquamarine", "cadetblue", "mediumorchid", "mediumpurple", "coral", "mediumslateblue", "cornflowerblue", "mediumturquoise", "crimson", "mediumvioletred", "cyan", "midnightblue", "darkblue", "mintcream", "darkcyan"];
	return colors[Math.floor(Math.random() * colors.length)];
};

function drawCircle(x, y, radius, filled) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, true);
	if (filled) {
		ctx.fill();
	}
	ctx.stroke();
};

function drawId(identifier, size, x, y) {
	ctx.font = size + "px " + "Courier";
  	ctx.textAlign = "center";
  	ctx.textBaseline = "middle";
  	ctx.fillText(identifier, x, y);
};

function playSound(circleId) {
	let audioId = "audio" + circleId;
	let rate = (Math.random() * 4.75) + 0.25; // playback rate range from 0.25 to 5.0
	if (audioId !== null) {
		document.getElementById(audioId).play();
		document.getElementById(audioId).playbackRate = rate;
	}
};

function getCircleId(event, arrayOfCircles) {
	for (var i = 0; i < arrayOfCircles.length; i++) {
		var differenceX = event.pageX - arrayOfCircles[i].x;
		var differenceY = event.pageY - arrayOfCircles[i].y;
		var distance = Math.floor(Math.sqrt((differenceX * differenceX) + (differenceY * differenceY)));
		if (distance < 30) {
			// console.log("you clicked the object #" + arrayOfCircles.indexOf(arrayOfCircles[i]));
			return arrayOfCircles.indexOf(arrayOfCircles[i]);
		}
	}
};

function removeCircle(circleId) {
	arrayOfCircles.splice(circleId, 1);
	numberOfCircles -= 1;
};

// render objects
function renderArrayOfCircles() {
	ctx.fillStyle = "White"; // this is because of a Firefox Extension I have that makes darker every webpage
	ctx.fillRect(0, 0, width, height);
	for (var i = 0; i < arrayOfCircles.length; i++) {
		arrayOfCircles[i].render;
	}
};

/*

classes

a class expression is one way to define a class in ECMAScript 2015
it can be named or unnamed : if named, the name of the class is local to the class body only
the body of a class expression is executed in strict mode

the get syntax binds an object property to a function that will be called when that property is looked up
the set syntax binds an object property to a function to be called when there is an attempt to set that property

*/

class Circle {
	constructor(identifier) {
		this.id = identifier;
		this.size = minMaxRandom(5, 30);
		this.x = minMaxRandom(1, width - 1);
		this.y = minMaxRandom(1, height - 1);
		this.xspeed = minMaxRandom(1, 2);
		this.yspeed = minMaxRandom(1, 3);
		this.color = pickRandomColor();
		this.sound;
	}
	draw() {
		ctx.fillStyle = this.color;
		drawCircle(this.x, this.y, this.size, true);
		ctx.fillStyle = "black";
  		drawId(this.id, this.size, this.x, this.y);
	}
	move() {
		this.x += this.xspeed;
		this.y += this.yspeed;
	}
	bounce() {
		if (this.x < 0 || this.x > width) {
			this.xspeed = -this.xspeed;
		}
		if (this.y < 0 || this.y > height) {
			this.yspeed = -this.yspeed;
		}
	}
	get sound() {
		this.audio = document.createElement("audio");
		this.audio.src = "/Users/sergionunez/Desktop/jovenes.programadores.JS&HTML/practice/marepoto.mp3";
		this.audio.setAttribute("id", "audio" + this.id);
		document.body.appendChild(this.audio);
	}
	get render() {
		this.draw();
		this.move();
		this.bounce();
	}
}

// create objects
for (var i = 0; i < numberOfCircles; i++) {
	arrayOfCircles[i] = new Circle(i);
}

/*

event listeners

*/

canvas.addEventListener("mousedown", mouseDown);

function mouseDown() {
  	var circleId = getCircleId(event, arrayOfCircles);
  	if (circleId !== undefined) {
  		playSound(circleId)
  		removeCircle(circleId);
  	}
  	if (numberOfCircles < 0) {
  		clearInterval(intervalId)
  	}
};