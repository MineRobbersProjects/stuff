var leekspin = new Howl({
	src: ["leekspin.mp3"],
	loop: true,
});

var update_time = new Date();

var percent_time = 0.57686;

var rate = 1;
var rate_timer = percent_time;
time = -1

function goTime() {
	time += 1;
	secs = time;
	mins = 0;
	hrs = 0;
	while (secs >= 60) {
		secs -= 60;
		mins += 1;
	}
	if (secs < 10) {
		secs = "0"+secs.toString()
	} else {
		secs = secs.toString()
	}
	while (mins >= 60) {
		mins -= 60;
		hrs += 1;
	}
	if (mins < 10) {
		mins = "0"+mins.toString()
	} else {
		mins = mins.toString()
	}
	if (hrs < 10) {
		hrs = "0"+hrs.toString()
	} else {
		hrs = hrs.toString()
	}
	document.getElementById("time").innerHTML = "<br>time: "+hrs+":"+mins+":"+secs
	setTimeout(goTime,1000)
}

function update() {

	var new_time = new Date();
	var delta = new_time.getTime() - update_time.getTime();
	update_time.setTime(new_time.getTime());

	rate_timer -= rate * delta / 1000;

	if (rate_timer <= 0) {
		rate_timer += percent_time;
		rate += 0.01;
		leekspin.rate(rate);
		document.getElementById("speed").innerHTML = "speed: " + (rate * 100).toFixed(0) + "%";
	}

	document.getElementById("leekspin").style.top = (rate - Math.random() * rate * 2) + "px";
	document.getElementById("leekspin").style.left = (rate - Math.random() * rate * 2) + "px";
	requestAnimationFrame(update);
}

function run() {
	leekspin.play();
	update_time = new Date();
	goTime()
	requestAnimationFrame(update);
}