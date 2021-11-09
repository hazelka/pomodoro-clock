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

class TodoList {
	constructor() {
		this.timeNeed = 0;
	}

	addTask = () => {
		document.getElementById('task').style.display = "block";
		document.getElementById('addTask').style.display = "none";
	}

	cancelTask = () => {
		document.getElementById('task').style.display = "none";
		document.getElementById('addTask').style.display = "block";
	}

	submitTask = () => {
		const description = document.getElementById('description');
		const estimate = document.getElementById('estimate');

		if (!description.value) {
			alert('Please enter task you are working on');
		} else if (estimate.value <= 0 || !Number.isInteger(+estimate.value)) {
			alert('Please enter a valid interger');
		} else {
			this.createTodo(description.value, Math.floor(estimate.value));
			description.value = "";
			estimate.value = "";
		}
	}

	createTodo = (desc, est) => {

		const del = document.createElement('BUTTON');
		del.innerHTML = 'X';
		del.style.float = "right";
		del.onclick = this.removeTodo;

		const complete = document.createElement('BUTTON');
		complete.innerHTML = "<i class='fa fa-square-o'></i>";
		complete.onclick = this.toggleTodo;

		const task = document.createElement('DIV');
		const description = document.createElement('SPAN');

		description.innerHTML = desc;
		task.append(del, complete, description);

		const estimate = document.createElement('DIV');
		estimate.innerHTML = est + " min";
		estimate.style.textAlign = "right";
		this.timeNeed += +est;

		const todo = document.createElement('DIV');
		todo.append(task, estimate);
		todo.className = "todo";

		document.getElementById('todos').appendChild(todo);
		this.updateFinishTime();
	}

	toggleTodo = (event) => {
		const time = parseInt(event.currentTarget.parentNode.nextSibling.innerHTML);
		const checkboxNode = event.currentTarget;
		const descriptionNode = event.currentTarget.nextSibling;

		if (descriptionNode.style.textDecoration === "line-through") {
			checkboxNode.innerHTML = '<i class="fa fa-square-o"></i>';
			descriptionNode.style.textDecoration = "none";
			this.timeNeed += time;
		} else {
			checkboxNode.innerHTML = '<i class="fa fa-check-square-o"></i>';
			descriptionNode.style.textDecoration = "line-through";
			this.timeNeed -= time;
		}
		this.updateFinishTime();
	}

	updateFinishTime = () => {
		if (!this.timeNeed) {
			document.getElementById('finish').innerHTML = "Everything is finished!";
			return;
		}

		const finishTime = new Date(Date.now() + this.timeNeed * 60000);
		const fmin = `${finishTime.getHours()}`.padStart(2, '0');
		const fsec = `${finishTime.getMinutes()}`.padStart(2, '0');

		document.getElementById('finish').innerHTML = `Estimate to finish at ${fmin} : ${fsec}`;
	}

	removeTodo = (event) => {
		const todo = event.target.closest('.todo');
		this.timeNeed -= parseInt(todo.lastChild.innerHTML);
		this.updateFinishTime();
		todo.remove();
	}
}

class Quotes {
	fetchQuotes = () => {
		fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
			.then(response => response.json())
			.then(data => {
				this.quotes = data.quotes;
				document.getElementById('quote').innerHTML = this.quotes[0].quote;
				document.getElementById('quote-author').innerHTML = '- ' + this.quotes[0].author;
				setInterval(() => this.getRandomQuote(this.quotes.length), 5000);
			});
	}

	getRandomQuote = (n) => {
		let random = Math.floor(Math.random() * n);
		document.getElementById('quote').innerHTML = this.quotes[random].quote;
		document.getElementById('quote-author').innerHTML = '- ' + this.quotes[random].author;
	}
}

const timer = new Timer();
const todoList = new TodoList();
const quotes = new Quotes();

quotes.fetchQuotes();

document.getElementById('clock').addEventListener(
	'click',
	function(event) {
		if (!event.target.dataset.action) return;
		timer[event.target.dataset.action]();
	}
);

document.getElementById('addTask').addEventListener(
	'click',
	function(event) {
		todoList.addTask();
	}
);

document.getElementById('cancel').addEventListener(
	'click',
	function(event) {
		todoList.cancelTask();
	}
);

document.getElementById('submit').addEventListener(
	'click', 
	function(event) {
		todoList.submitTask();
	}
);


