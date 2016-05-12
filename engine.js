var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
var canvasSizeScale = 0.8;

canvas.width = window.innerWidth * canvasSizeScale;
canvas.height = window.innerHeight * canvasSizeScale;

canvas.style.left = (window.innerWidth - canvas.width)/2;
canvas.style.top = (window.innerHeight - canvas.height)/2;

var defaultVal = {
	p_num: 15,
	min_p_num: 10,
	max_p_num: 100,
	p_rad: 5,
	min_p_rad: 3,
	max_p_rad: 10,
	p_color: "rgba(255,100,0,0.8)"
};

var pixel = function() {
	this.x = Math.random() * (canvas.width - 3*defaultVal.max_p_rad) + 1.5*defaultVal.max_p_rad;
	this.y = Math.random() * (canvas.height - 3*defaultVal.max_p_rad) + 1.5*defaultVal.max_p_rad;
};

var controller = function() {
	var self = this;
	this.p_num = defaultVal.p_num;
	this.p_rad = defaultVal.p_rad;
	this.p_color = defaultVal.p_color;
	this.pixels = [];
	this.gen = function() {
		if (self.p_num > self.pixels.length) {
			for (var i=self.pixels.length; i<self.p_num; i++) {
				self.pixels.push(new pixel());
			}
		} else if (self.p_num < self.pixels.length) {
			for (var i=self.pixels.length - 1; i>=self.p_num; i--) {
				self.pixels.pop();
			}
		}
	};
	this.gen();

	this.draw = function() {
		requestAnimationFrame(self.draw);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = self.p_color;
		self.pixels.forEach(function(pixel) {
			ctx.beginPath();
			ctx.arc(pixel.x, pixel.y, self.p_rad, 0, 2*Math.PI);
			ctx.closePath();
			ctx.fill();
		});
	};
	this.draw();
};

window.onload = function() {
	var stage = new controller();
	var gui = new dat.GUI();
	var pixelate = gui.add(stage, 'p_num', defaultVal.min_p_num, defaultVal.max_p_num);
	gui.add(stage, 'p_rad', defaultVal.min_p_rad, defaultVal.max_p_rad);
	gui.add(stage, 'p_color');

	pixelate.onChange(function(value) {
		stage.gen();
	});
};
