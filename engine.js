var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");
var canvasSizeScale = 0.8;

canvas.width = window.innerWidth * canvasSizeScale;
canvas.height = window.innerHeight * canvasSizeScale;

canvas.style.left = (window.innerWidth - canvas.width)/2;
canvas.style.top = (window.innerHeight - canvas.height)/2;

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var defaultVal = {
	p_num: 15,
	min_p_num: 10,
	max_p_num: 100,
	p_rad: 5,
	min_p_rad: 3,
	max_p_rad: 10,
	p_color: "rgba(255,100,0,0.8)",
	m_color: "rgba(255,0,0,0.8)",
	k: 5,
	min_k: 2,
	max_k: 10
};

var pixel = function() {
	this.x = Math.random() * (canvas.width - 3*defaultVal.max_p_rad) + 1.5*defaultVal.max_p_rad;
	this.y = Math.random() * (canvas.height - 3*defaultVal.max_p_rad) + 1.5*defaultVal.max_p_rad;
};

var controller = function() {
	var self = this;
	this.kmeansstart = false;
	this.p_num = defaultVal.p_num;
	this.p_rad = defaultVal.p_rad;
	this.p_color = defaultVal.p_color;
	this.m_color = defaultVal.m_color;
	this.pixels = [];
	this.k = defaultVal.k;
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

		if (self.kmeansstart) {
			self.drawMeans();
		}
	};
	this.draw();

	this.means = [];

	this.kmeans = function() {
		self.means = [];
		shuffle(self.pixels);
		if (self.k >= self.p_num) {
			self.message = "Check k value!";
		} else {
			for (var i=0; i<self.k; i++) {
				self.means.push(self.pixels[i]);
			}
			self.message = "Iteration 1";
			self.kmeansstart = true;
		}
	};

	this.drawMeans = function() {
		ctx.fillStyle = self.m_color;
		self.means.forEach(function(pixel) {
			ctx.beginPath();
			ctx.arc(pixel.x, pixel.y, self.p_rad, 0, 2*Math.PI);
			ctx.closePath();
			ctx.fill();
		});
	};

	this.message = "Hello There!";
};

window.onload = function() {
	var stage = new controller();
	var gui = new dat.GUI();
	var pixelate = gui.add(stage, 'p_num').min(defaultVal.min_p_num).max(defaultVal.max_p_num).step(1);
	gui.add(stage, 'k').min(defaultVal.min_k).max(defaultVal.max_k).step(1);
	gui.add(stage, 'p_rad', defaultVal.min_p_rad, defaultVal.max_p_rad);
	gui.addColor(stage, 'p_color');
	gui.add(stage, 'kmeans');
	gui.add(stage, 'message').listen();

	pixelate.onChange(function(value) {
		stage.gen();
	});
};
