import Timer from './modules/Timer.js';
import TodoList from './modules/TodoList.js';
import Quotes from './modules/Quotes.js';

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


