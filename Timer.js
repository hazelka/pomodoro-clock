class Timer {
	constructor() {
		this.break = 5;
		this.session = 25;
		this.minute = 25;
		this.second = 0;
		this.timerId = null;
		this.inSession = true;
	}

	increaseBreak = () => {
		this.break++;
		document.getElementById('break').innerHTML = this.break;
		if (!this.inSession) {
			this.minute = this.break;
			this.second = 0;
			this.updateTimer();
		}
	}

	decreaseBreak = () => {
		if (this.break > 1) {
			this.break--;
			document.getElementById('break').innerHTML = this.break;
			if (!this.inSession) {
				this.minute = this.break;
				this.second = 0;
				this.updateTimer();
			}
		}
	}

	increaseSession = () => {
		this.session++;
		document.getElementById('session').innerHTML = this.session;
		if (this.inSession) {
			this.minute = this.session;
			this.second = 0;
			this.updateTimer();
		}
	}

	decreaseSession = () => {
		if(this.session > 1) {
			this.session--;
			document.getElementById('session').innerHTML = this.session;
			if (this.inSession) {
				this.minute = this.session;
				this.second = 0;
				this.updateTimer();
			}
		}
	}

	toggleTimer = () => {
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = null;
		} else {
			this.timerId = setInterval(() => {
				this.tick();
				this.updateTimer();
			}, 1000);
		}
	}

	tick = () => {
		if (this.second === 0) {
			if (this.minute > 0) {
				this.minute--;
				this.second = 59;
			} else {
				this.inSession = !this.inSession;
				this.minute = this.inSession ? this.session : this.break;
				document.getElementById('current').innerHTML = this.inSession ? 'Session' : 'Break';
			}
		} else {
			this.second--;
		}
	}

	updateTimer = () => {
		const minute = this.minute.toString().padStart(2, "0");
		const second = this.second.toString().padStart(2, "0");

		document.getElementById('timer').innerHTML = minute + ":" + second;
	}

	resetTimer = () => {
		clearInterval(this.timerId);

		this.break = 5;
		this.session = 25;
		this.minute = 25
		this.second = 0;
		this.inSession = true;
		this.timerId = null;
		
		document.getElementById('break').innerHTML = this.break;
		document.getElementById('session').innerHTML = this.session;
		document.getElementById('current').innerHTML = "Session";
		this.updateTimer();
	}
}