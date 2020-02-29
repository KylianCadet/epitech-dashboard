class Timer {
	constructor() {
		this.all_timer = [];
	}
	addTimer(id, timer, obj, callback) {
		if (timer == 0)
			return;
		callback(obj)
		var func = setInterval(function () { callback(obj) }, timer * 1000);
		this.all_timer.push({ id: id, func: func })
	}
	stopTimer(id) {
		for (var i = 0; i != this.all_timer.length; i++) {
			if (this.all_timer[i].id == id) {
				clearInterval(this.all_timer[i].func)
				this.all_timer.splice(i, 1);
				return;
			}
		}
	}
}

my_timer = new Timer();