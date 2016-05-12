var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
var canvasSizeScale = 0.8;

canvas.width = window.innerWidth * canvasSizeScale;
canvas.height = window.innerHeight * canvasSizeScale;

canvas.style.left = (window.innerWidth - canvas.width)/2;
canvas.style.top = (window.innerHeight - canvas.height)/2;
